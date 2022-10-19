//Solution from Playlister_HW2_Solution
// import React, { Component } from 'react';

// export default class DeleteListModal extends Component {
//     handleConfirmDeleteList = () => {
//         this.props.deleteListCallback();
//     }

//     handleCancelDeleteList = () => {
//         this.props.hideModalCallback();
//     }

//     render() {
//         const { 
//             isOpenCallback, 
//             listKeyPair } = this.props;
//         let name = "";
//         if (listKeyPair) {
//             name = listKeyPair.name;
//         }
//         let modalClass = "modal";
//         if (isOpenCallback()) {
//             modalClass += " is-visible";
//         }
//         return (
//             <div
//                 id="delete-list-modal"
//                 className={modalClass}
//                 data-animation="slideInOutLeft">
//                 <div className="modal-root" id='verify-delete-list-root'>
//                     <div className="modal-north">
//                     Delete the {name} playlist?
//                     </div>
//                     <div className="modal-center">
//                         <div className="modal-center-content">
//                             Are you sure you wish to permanently delete the {name} playlist?
//                         </div>
//                     </div>
//                     <div className="modal-south">
//                         <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={this.handleConfirmDeleteList} value='Confirm' />
//                         <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={this.handleCancelDeleteList} value='Cancel' />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

//dlian
// import React from 'react';

// function DeleteListModal() {
//   return (
//     <div class='modal' id='delete-list-modal' data-animation='slideInOutLeft'>
//       <div class='modal-root' id='verify-delete-list-root'>
//         <div class='modal-north'>Delete playlist?</div>
//         <div class='modal-center'>
//           <div class='modal-center-content'>
//             Are you sure you wish to permanently delete the playlist?
//           </div>
//         </div>
//         <div class='modal-south'>
//           <input
//             type='button'
//             id='delete-list-confirm-button'
//             class='modal-button'
//             value='Confirm'
//           />
//           <input
//             type='button'
//             id='delete-list-cancel-button'
//             class='modal-button'
//             value='Cancel'
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeleteListModal;

// Top5Lister Solution
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
function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.currentList) {
        console.log("The name of the playlist for delete modal is: " + store.currentList.name)
        name = store.currentList.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
        event.stopPropagation();
    }
    function handleCloseModal(event) {
        store.hideDeleteListModal();
        event.stopPropagation();
    }
    
    return (
        <div
            className="modal"
            id="delete-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog">
                <header className="dialog-header">
                    {/* Delete the (name != null) ? {name} : Untitled Playlist? */}
                    Delete the {name} Playlist?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );

    //Taken from the hw2 solutions, doesn't seem to work because no css.
    // return (
    //     <div
    //         // id="delete-list-modal"
    //         id = 'delete-modal'
    //         // className={modalClass}
    //         className = 'modal'
    //         data-animation="slideInOutLeft">
    //         <div className="modal-root" id='verify-delete-list-root'>
    //             <div className="modal-north">
    //             Delete the {name} playlist?
    //             </div>
    //             <div className="modal-center">
    //                 <div className="modal-center-content">
    //                     Are you sure you wish to permanently delete the {name} playlist?
    //                 </div>
    //             </div>
    //             <div className="modal-south">
    //                 <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={handleDeleteList} value='Confirm' />
    //                 <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={handleCloseModal} value='Cancel' />
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default DeleteModal;