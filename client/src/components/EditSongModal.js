// This is my solution for delete song modal but with a few things edited to kind of make it edit song modal but this is deprecated and not going to be used.
// import { useContext } from 'react'
// import { GlobalStoreContext } from '../store'
// /*
//     This modal is shown when the user asks to delete a list. Note 
//     that before this is shown a list has to be marked for deletion,
//     which means its id has to be known so that we can retrieve its
//     information and display its name in this modal. If the user presses
//     confirm, it will be deleted.

//     @author McKilla Gorilla
// */
// function EditSongModal() {
//     const { store } = useContext(GlobalStoreContext);
//     let name = "";
//     if (store.currentList) {
//         console.log("The name of the song for edit song modal is: " + store.currentList.name)
//         name = store.currentList.name;
//     }
//     function handleDeleteSong(event) {
//         store.deleteMarkedSong();
//         event.stopPropagation();
//     }
//     function handleCloseSongModal(event) {
//         store.hideDeleteSongModal();
//         event.stopPropagation();
//     }

//     return (
//         <div
//             className="modal"
//             id="edit-song-modal"
//             data-animation="slideInOutLeft">
//             <div className="modal-dialog">
//                 <header className="dialog-header">
//                     {/* Delete the (name != null) ? {name} : Untitled Playlist? */}
//                     Edit the {name} Song?
//                 </header>
//                 <div id="confirm-cancel-container">
//                     <button
//                         id="dialog-yes-button"
//                         className="modal-button"
//                         onClick={handleDeleteSong}
//                     >Confirm</button>
//                     <button
//                         id="dialog-no-button"
//                         className="modal-button"
//                         onClick={handleCloseSongModal}
//                     >Cancel</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useContext } from 'react';
// import React, { useState, useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router';
import { GlobalStoreContext } from '../store';

const EditSongModal = () => {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [youTubeId, setYouTubeId] = useState('');

    // THIS FUNCTION IS FOR HIDING THE MODAL
    const hideEditSongModal = () => {
        let modal = document.getElementById('edit-song-modal');
        modal.classList.remove('is-visible');
        let editedSong = { title: title, artist: artist, youTubeId: youTubeId };
        console.log("Edited song in hide edit song modal is: " + editedSong)
        // store.editSong(editedSong);
        // store.addEditSongTransaction(editedSong)
        store.editSong(editedSong);

    };
    const handleEditSong = () => {
        // let editedSong = { title: title, artist: artist, youTubeId: youTubeId };
        // store.addEditSongTransaction(editedSong);
        setTitle('');
        setArtist('');
        setYouTubeId('');
        hideEditSongModal();
    };
    // useEffect(() => {
    //     setTitle(store.title);
    //     setArtist(store.markedForChanges.artist);
    //     setYouTubeId(store.markedForChanges.youTubeId);
    // }, [store.markedForChanges]);
    return (
        <div class='modal' id='edit-song-modal' data-animation='slideInOutLeft'>
            <div class='modal-root' id='verify-edit-song-root'>
                <div class='modal-north'>Edit Song</div>
                <div class='modal-center'>
                    <div class='modal-center-content'>
                        <div class='edit-song-modal-row'>
                            <span class='modal-label'>Title:</span>
                            <input
                                type='text'
                                id='edit-song-title-form'
                                class='modal-form'
                                value={title}
                                placeholder=''
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div class='edit-song-modal-row'>
                            <span class='modal-label'>Artist:</span>
                            <input
                                type='text'
                                id='edit-song-artist-form'
                                class='modal-form'
                                value={artist}
                                placeholder=''
                                onChange={(event) => setArtist(event.target.value)}
                            />
                        </div>
                        <div class='edit-song-modal-row'>
                            <span class='modal-label'>YouTubeId:</span>
                            <input
                                type='text'
                                id='edit-song-youTubeId-form'
                                class='modal-form'
                                value={youTubeId}
                                placeholder=''
                                onChange={(event) => setYouTubeId(event.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div class='modal-south'>
                    <input
                        type='button'
                        id='edit-song-confirm-button'
                        class='modal-button'
                        value='Confirm'
                        onClick={handleEditSong}
                    />
                    <input
                        type='button'
                        id='edit-song-cancel-button'
                        class='modal-button'
                        value='Cancel'
                        onClick={hideEditSongModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditSongModal;

//Taken from hw2 solutions
// export default DeleteSongModal;

// import React, { Component } from 'react';

// export default class EditSongModal extends Component {
//     constructor(props) {
//         super(props);
//         if (this.props.songToEdit) {
//             this.state = {
//                 isLoading: true,
//                 title: this.props.songToEdit.title,
//                 artist: this.props.songToEdit.artist,
//                 youTubeId: this.props.songToEdit.youTubeId
//             };
//         }
//         else {
//             this.state = {
//                 title: "?",
//                 artist: "?",
//                 youTubeId: "?"
//             };
//         }
//     }

//     handleConfirmEditSong = () => {
//         let newSongData = {
//             title: this.state.title,
//             artist: this.state.artist,
//             youTubeId: this.state.youTubeId
//         };
//         this.props.updateSongCallback(this.props.songIndex, newSongData);
//     }

//     handleCancelEditSongModal = () => {
//         this.props.hideModalCallback();
//     }

//     handleUpdateTitle = (event) => {
//         this.setState(
//             { title: event.target.value }
//         );
//     }

//     handleUpdateArtist = (event) => {
//         this.setState(
//             { artist: event.target.value }
//         );
//     }

//     handleUpdateYouTubeId = (event) => {
//         this.setState(
//             { youTubeId: event.target.value }
//         );
//     }

//     render() {
//         const { isOpenCallback } = this.props;
//         let modalClass = "modal";
//         if (isOpenCallback()) {
//             modalClass += " is-visible";
//         }
//         return (
//             <div
//                 id="edit-song-modal"
//                 className={modalClass}
//                 data-animation="slideInOutLeft">
//                 <div
//                     id='edit-song-root'
//                     className="modal-root">
//                     <div
//                         id="edit-song-modal-header"
//                         className="modal-north">Edit Song</div>
//                     <div
//                         id="edit-song-modal-content"
//                         className="modal-center">
//                         <div id="title-prompt" className="modal-prompt">Title:</div>
//                         <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" defaultValue={this.props.songToEdit.title} onChange={this.handleUpdateTitle} />
//                         <div id="artist-prompt" className="modal-prompt">Artist:</div>
//                         <input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" defaultValue={this.state.artist} onChange={this.handleUpdateArtist} />
//                         <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
//                         <input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" defaultValue={this.state.youTubeId} onChange={this.handleUpdateYouTubeId} />
//                     </div>
//                     <div className="modal-south">
//                         <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={this.handleConfirmEditSong} />
//                         <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={this.handleCancelEditSongModal} />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }