import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.currentList) {
        console.log("The name of the song for delete song modal is: " + store.currentList.name)
        name = store.currentList.name;
    }
    function handleDeleteSong(event) {
        store.deleteMarkedSong();
        event.stopPropagation();
    }
    function handleCloseSongModal(event) {
        store.hideDeleteSongModal();
        event.stopPropagation();
    }

    return (
        <div
            className="modal"
            id="delete-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog">
                <header className="dialog-header">
                    {/* Delete the (name != null) ? {name} : Untitled Playlist? */}
                    {/* Delete the {name} Song? */}
                    Delete the song?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteSong}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseSongModal}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteSongModal;

//Solution from HW2, delete song modal react
// import React, { Component } from 'react';

// export default class RemoveSongModal extends Component {
//     handleConfirmRemoveSong = () => {
//         this.props.removeSongCallback();
//     }

//     handleCancelRemoveSong = () => {
//         this.props.hideModalCallback();
//     }

//     render() {
//         const {
//             isOpenCallback,
//             songToRemove } = this.props;

//         let modalClass = "modal";
//         if (isOpenCallback()) {
//             modalClass += " is-visible";
//         }
//         let songTitle = "";
//         if (songToRemove) {
//             songTitle = songToRemove.title;
//         }
//         return (
//             <div
//                 id="remove-song-modal"
//                 className={modalClass}
//                 data-animation="slideInOutLeft">
//                 <div className="modal-root" id='verify-remove-song-root'>
//                     <div className="modal-north">
//                         Remove {songTitle}?
//                     </div>
//                     <div className="modal-center">
//                         <div className="modal-center-content">
//                             Are you sure you wish to permanently remove {songTitle} from the playlist?
//                         </div>
//                     </div>
//                     <div className="modal-south">
//                         <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={this.handleConfirmRemoveSong} value='Confirm' />
//                         <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={this.handleCancelRemoveSong} value='Cancel' />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }