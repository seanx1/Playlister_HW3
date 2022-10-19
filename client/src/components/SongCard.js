import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedTo, setDraggedTo] = useState(false);

    //ADDED to handle moving songs
    const handleDragStart = (event) => {
        console.log("Drag Start")
        event.dataTransfer.setData('song', event.target.id);
        setIsDragging(true);
    };
    const handleDragOver = (event) => {
        console.log("Drag Over")
        event.preventDefault();
        // setDraggedTo(true);
    };
    const handleDragEnter = (event) => {
        console.log("Drag Enter")
        event.preventDefault();
        setDraggedTo(true);
    };
    const handleDragLeave = (event) => {
        console.log("Drag Leave")
        event.preventDefault();
        setDraggedTo(false);
    };

    const handleDrop = (event) => {
        event.stopPropagation();
        console.log("Handle Drop")
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        console.log("The target ID for handle drop is: " + targetId);
        targetId = targetId.substring(target.id.indexOf('-') + 1);
        let sourceId = event.dataTransfer.getData('song');
        sourceId = sourceId.substring(sourceId.indexOf('-') + 1);

        setIsDragging(false);
        setDraggedTo(false);

        console.log("The actual parsed target ID for handle drop is: " + targetId);
        console.log("The actual parsed source ID for handle drop is: " + sourceId);
        console.log("Adding move song transaction")
        store.addMoveSongTransaction(parseInt(sourceId), parseInt(targetId));
        console.log("Added move song transaction")
        // ASK THE MODEL TO MOVE THE DATA
        // console.log("The actual parsed target ID for handle drop is: " + targetId);
        // console.log("The actual parsed source ID for handle drop is: " + sourceId);
        // store.moveSong(parseInt(sourceId), parseInt(targetId));
        event.stopPropagation();
    };

    //ADDED in order to handle editing  a song
    const handleEditSong = (event) => {
        event.preventDefault();
        // store.deleteSong(index);
        //let id = event.target.id.substring('delete-list-'.length);
        console.log('The index of the song to be edited is: ' + index);
        // store.markSongForDeletion(index);
        // store.deleteSong(index);

        //Where we will handle the editing of the song
        const showEditSongModal = () => {
            let modal = document.getElementById('edit-song-modal');
            modal.classList.add('is-visible');
        };
        store.markSong(index);
        showEditSongModal();

        event.stopPropagation();
    };

    //ADDED in order to handle deleting a song
    const handleDeleteSong = (event) => {
        event.preventDefault();
        // store.deleteSong(index);
        //let id = event.target.id.substring('delete-list-'.length);
        console.log('The index of the song to be deleted is: ' + index);
        store.markSongForDeletion(index);
        // store.deleteSong(index);
        event.stopPropagation();
    };

    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            // id={'song-' + index + '-card'}
            id={'song-' + index}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable='true'
            onDoubleClick={handleEditSong}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                // onClick={() => {
                //     console.log(store.currentList);
                //     handleDeleteSong
                // }}
                onClick={handleDeleteSong}
            />
        </div>

    );
}

export default SongCard;