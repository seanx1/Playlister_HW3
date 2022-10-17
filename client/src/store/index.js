import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playists;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function () {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    //ADDED This function creates a playlist Copied and pasted from change list name
    // store.createNewList = function () {
    //     // GET THE LIST
    //     async function asyncCreateNewList(id) {
    //         let response = await api.getPlaylistById(id);
    //         if (response.data.success) {
    //             let playlist = response.data.playist;
    //             playlist.name = newName;
    //             async function updateList(playlist) {
    //                 response = await api.updatePlaylistById(playlist._id, playlist);
    //                 if (response.data.success) {
    //                     async function getListPairs(playlist) {
    //                         response = await api.getPlaylistPairs();
    //                         if (response.data.success) {
    //                             let pairsArray = response.data.idNamePairs;
    //                             storeReducer({
    //                                 type: GlobalStoreActionType.CHANGE_LIST_NAME,
    //                                 payload: {
    //                                     idNamePairs: pairsArray,
    //                                     playlist: playlist
    //                                 }
    //                             });
    //                         }
    //                     }
    //                     getListPairs(playlist);
    //                 }
    //             }
    //             updateList(playlist);
    //         }
    //     }
    //     asyncCreateNewList(id);
    // }

    //ADDED This function creates a new list
    store.createNewList = function () {
        async function asyncCreateNewList() {
            const playlist = { name: "Untitled", songs: [] };
            const response = await api.createPlaylist(playlist);
            if (response.data.success) {
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                }
                );

                // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                store.history.push("/playlist/" + newList._id);
            }
            else {
                console.log("API FAILED TO CREATE A NEW LIST");
            }
        }
        asyncCreateNewList();
    }

    // THIS FUNCTION ADDS A NEW PLAYLIST
    //   store.createNewList = () => {
    //     const playlist = { name: 'untitled', songs: [] };
    //     const asyncCreateNewList = async () => {
    //       const response = await api.createPlaylist(playlist);
    //       if (response.data.success) {
    //         let playlist = response.data.playlist;
    //         if (response.data.success) {
    //           storeReducer({
    //             type: GlobalStoreActionType.SET_CURRENT_LIST,
    //             payload: playlist,
    //           });
    //           store.history.push('/playlist/' + playlist._id);
    //         }
    //       }
    //     };
    //     asyncCreateNewList();
    //   }; 

    // store.deletePlaylist = (id) => {
    //     // GET THE LIST
    //     async function asyncDeletePlaylist(id) {
    //         let response = await api.getPlaylistById(id);
    //         let playlist = response.data.playlist;
    //         if (response.data.success) {
    //             storeReducer({
    //                 type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
    //                 payload: {},
    //             });
    //             async function deleteList(playlist) {
    //                 response = await api.deletePlaylistById(playlist._id);
    //                 if (response.data.success) {
    //                     async function getListPairs(playlist) {
    //                         response = await api.getPlaylistPairs();
    //                         if (response.data.success) {
    //                             let pairsArray = response.data.idNamePairs;
    //                             storeReducer({
    //                                 type: GlobalStoreActionType.CHANGE_LIST_NAME,
    //                                 payload: {
    //                                     idNamePairs: pairsArray,
    //                                     playlist: playlist,
    //                                 },
    //                             });
    //                         }
    //                     }
    //                     getListPairs(playlist);
    //                 }
    //             }
    //             deleteList(playlist);
    //         }
    //     }
    //     asyncDeletePlaylist(id);
    // };

    // store.deletePlaylist = (id) => {
    //     // GET THE LIST
    //     async function asyncDeletePlaylist(id) {
    //         let response = await api.getPlaylistById(id);
    //         let playlist = response.data.playlist;
    //         if (response.data.success) {
    //             storeReducer({
    //                 type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
    //                 payload: {},
    //             });
    //             async function deleteList(playlist) {
    //                 response = await api.deletePlaylistById(playlist._id);
    //                 store.loadIdNamePairs();
    //             }
    //             deleteList(playlist);
    //         }
    //     }
    //     asyncDeletePlaylist(id);
    // };



    //ADDED This is likely to be the one we use
    // store.markListForDeletion = function (id) {
    //     storeReducer({
    //         type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
    //         payload: id
    //     });
    //     store.showDeleteListModal();
    // }
    store.deletePlaylist = function (id) {
        async function asyncProcessDelete(id) {
            console.log('Calling store.playlist with id: ' + id);
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                store.history.push("/");
            }
        }
        asyncProcessDelete(id);
        console.log('deletePlaylist succeeded.')
    }
    // store.deleteMarkedList = function() {
    //     store.deleteList(store.listMarkedForDeletion);
    //     store.hideDeleteListModal();
    // }
    // store.showDeleteListModal = function() {
    //     let modal = document.getElementById("delete-modal");
    //     modal.classList.add("is-visible");
    // }
    // store.hideDeleteListModal = function() {
    //     let modal = document.getElementById("delete-modal");
    //     modal.classList.remove("is-visible");
    // }

    store.moveSong = (start, end) => {
        //Shift everything between the start and end point and add to the end
        const list = store.currentList;
        if (start < end) {
            let temp = list.songs[start];
            console.log("start < end: " + temp);
            for (let i = start; i < end; i++) {
                console.log(i + 1);
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        } else if (start > end) {
            let temp = list.songs[start];
            console.log("start > end: " + temp);
            for (let i = start; i > end; i--) {
                console.log(i - 1);
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        //Update the playlist after the songs have been moved locally.
        async function asyncUpdateData(playlist) {
            console.log("Started async move song")
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                console.log(response.data.playlist);
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: response.data.playlist,
                });
            }
        }

        asyncUpdateData(list);
        console.log("Finished asyncMoveSong")
    };

    // store.moveSong = function(start, end) {
    //     if (start < end) {
    //         let temp = store.currentList.songs[start];
    //         console.log(temp);
    //         for (let i = start; i < end; i++) {
    //             store.currentList.songs[i] = store.currentList.songs[i + 1];
    //         }
    //         store.currentList.songs[end] = temp;
    //     }
    //     else if (start > end) {
    //         let temp = store.currentList.songs[start];
    //         for (let i = start; i > end; i--) {
    //             store.currentList.songs[i] = store.currentList.songs[i - 1];
    //         }
    //         store.currentList.songs[end] = temp;
    //     }
    //     store.updateList();
    // }

    store.addSong = (title, artist, youTubeId) => {
        console.log("Adding song")
        const list = store.currentList;
        const song = { title: title, artist: artist, youTubeId: youTubeId };
        console.log("Adding song with: [" + title + ", " + artist + ", " + youTubeId + "]");
        list.songs.push(song);
        async function asyncUpdateData(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                console.log(response.data.playlist);
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: response.data.playlist,
                });
            }
        }
        asyncUpdateData(list);
    };

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}