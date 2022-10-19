import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'

//ADDED Transactions
// import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
// import UpdateItem_Transaction from '../transactions/UpdateItem_Transaction'
import AddSong_Transaction from '../transactions/AddSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import EditSong_Transaction from '../transactions/EditSong_Transaction'
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction'
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
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_SONG_FOR_CHANGES: "MARK_SONG_FOR_CHANGES"
    // SELECT_SONG: 'SELECT_SONG',
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
        listNameActive: false,
        markedForDeletion: null
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
                    listNameActive: false,
                    markedForChanges: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedForChanges: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markedForChanges: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedForChanges: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedForChanges: payload
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markedForChanges: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markedForChanges: null
                });
            }
            // PREPARE TO DELETE A SONG
            case GlobalStoreActionType.MARK_SONG_FOR_CHANGES: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markedForChanges: payload
                });
            }
            // }
            // case GlobalStoreActionType.SELECT_SONG: {
            //     return setStore({
            //       idNamePairs: store.idNamePairs,
            //       currentList: store.currentList,
            //       newListCounter: store.newListCounter,
            //       listNameActive: false,
            //       selectedListId: '',
            //       selectedSongIdx: payload,
            //     });
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.


    //ADDED THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null,
        });
    };

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        console.log("Beginning to change the name")
        console.log("The new name is: " + newName)
        // if(!newName) {
        //     response = 
        //     newName = store.idNamePairs[id]
        // }
        console.log("After checking to see if the newName given was empty and setting to old if so, newName is now: " + newName)
        console.log("Seems like my hack did not work.")
        async function asyncChangeListName(id) {
            // let response1 = await api.getPlaylistById(id);
            // if (response1.data.success) {
            //     store.loadIdNamePairs();
            //     store.history.push("/");
            // }

            console.log("The id being used to change list name is: " + id)
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                // let playlist = response.data.playlists;
                if (!newName) {
                    newName = response.data.playlist.name;
                }
                console.log("Now it seems to make sure that the playlist name stays the same if no changes were made. The newName is now: " + newName)
                let playlist = response.data.playlist;
                console.log("Playlist is" + playlist)
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
        tps.clearAllTransactions();
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

    // store.canUndo = () => {
    //     return tps.hasTransactionToUndo();
    // };
    // store.canRedo = () => {
    //     return tps.hasTransactionToRedo();
    // };

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    // store.setlistNameActive = function () {
    //     storeReducer({
    //         type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
    //         payload: null
    //     });
    // }

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
    store.markListForDeletion = function (id) {
        console.log("Playlist with id:" + id + "is marked for deletion")
        const toBeSent = id + '';
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: toBeSent
        });
        store.showDeleteListModal();
    }
    store.deleteList = function (id) {
        console.log("deleteList was called")
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
    store.deleteMarkedList = function () {
        console.log("deleteMarkedList was called which will call store.deleteList")
        console.log("The value of store.listMarkedForDeletion is : " + store.markedForChanges)
        store.deleteList(store.markedForChanges);
        store.hideDeleteListModal();
    }
    store.showDeleteListModal = function () {
        console.log("Beginning to try to show delete list modal")
        let modal = document.getElementById("delete-modal");
        modal.classList.add("is-visible");
        console.log("Finished showing delete list modal")
    }
    store.hideDeleteListModal = function () {
        console.log("hideDeleteListModal was called")
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
    }

    //ADDED to add song
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
                    // payload: response.data.playlist,
                    payload: playlist
                });
            }
        }
        asyncUpdateData(list);
    };

    store.addAddSongTransaction = () => {
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    };

    //ADDED
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
                    // payload: response.data.playlist,
                    payload: playlist
                });
            }
        }

        asyncUpdateData(list);
        console.log("Finished asyncMoveSong")
    };

    store.addMoveSongTransaction = (initOldSongIndex, initNewSongIndex) => {
        const transaction = new MoveSong_Transaction(
            store,
            initOldSongIndex,
            initNewSongIndex
        );
        console.log("Adding a move song transaction")
        tps.addTransaction(transaction);
    };

    // store.addMoveSongTransaction = function (start, end) {
    //     let transaction = new MoveSong_Transaction(store, start, end);
    //     tps.addTransaction(transaction);
    // }
    // store.addUpdateSongTransaction = function (index, newText) {
    //     let oldText = store.currentList.items[index];
    //     let transaction = new UpdateSong_Transaction(store, index, oldText, newText);
    //     tps.addTransaction(transaction);
    // }

    //ADDED This is likely to be the one we use to edit song 
    store.markSong = (index) => {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_CHANGES,
            payload: index,
        });
    };
    store.editSong = (editedSong) => {
        console.log("Now editing the song")
        console.log(editedSong)
        const list = store.currentList;
        let song = list.songs[store.markedForChanges];
        console.log("We will not allow them to change what is stored unless everything has a value.")
        if (editedSong.title && editedSong.artist && editedSong.youTubeId) {
            song.title = editedSong.title;
            song.artist = editedSong.artist;
            song.youTubeId = editedSong.youTubeId;
        }
        async function asyncUpdatePlaylist(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: list,
                });
            }
        }
        asyncUpdatePlaylist(list);
    };

    store.addEditSongTransaction = (editedSong) => {
        const uneditedSong = store.currentList.songs[store.markedForChanges];
        const uneditedSongClone = {
            title: uneditedSong.title,
            artist: uneditedSong.artist,
            youTubeId: uneditedSong.youTubeId,
        };
        console.log("Unedited song is: " + uneditedSong.name)
        console.log("Edited song is: " + editedSong.name)
        const transaction = new EditSong_Transaction(
            store,
            store.markedForChanges,
            uneditedSongClone,
            editedSong
        );
        tps.addTransaction(transaction);
    };

    //ADDED This is likely to be the one we use to remove song 
    store.markSongForDeletion = function (index) {
        console.log("Song with index: " + index + " is marked for deletion")
        const toBeSent = index + '';
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_CHANGES,
            payload: toBeSent
        });
        store.showDeleteSongModal();
    }
    store.deleteSong = function (index) {
        console.log("deleteSong was called")

        const list = store.currentList;
        list.songs.splice(index, 1);
        console.log("Spliced")

        async function asyncProcessDelete(playlist) {
            // console.log('Calling store.deleteSong with index: ' + index);
            // list.songs.splice(index, 1);
            console.log('Started async delete song')
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                // store.loadIdNamePairs();
                // store.history.push("/");
                console.log(response.data.playlist);
                // storeReducer({
                //     type: GlobalStoreActionType.SET_CURRENT_LIST,
                //     payload: response.data.playlist,
                // });
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    // payload: response.data.playlist,
                    payload: playlist
                });
            }
        }
        asyncProcessDelete(list)
        console.log('deleteSong succeeded.')
    }
    store.deleteMarkedSong = function () {
        console.log("deleteMarkedSong was called which will call store.deleteSong")
        console.log("The value of store.songMarkedForDeletion is : " + store.markedForChanges)
        store.deleteSong(store.markedForChanges);
        store.hideDeleteSongModal();
    }
    store.showDeleteSongModal = function () {
        console.log("Beginning to try to show delete song modal")
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
        console.log("Finished showing delete song modal")
    }
    store.hideDeleteSongModal = function () {
        console.log("hideDeleteSongModal was called")
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}