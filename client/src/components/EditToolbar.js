import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'

import DeleteSongModal from './DeleteSongModal.js'
// import EditSongModal from './EditSongModal.js'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    //ADDED This to handle adding song
    const handleAddSong = (event) => {
        // store.addSong('Untitled', 'Unknown', 'dQw4w9WgXcQ');
        store.addAddSongTransaction();
        event.stopPropagation();
    };
    
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={enabledButtonClass}
                //ADDED in order to handle the button click
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
            <DeleteSongModal />
            {/* <EditSongModal /> */}
        </span>);
}

export default EditToolbar;