import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal.js';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    //? : 
    function returntoHomePage() {
        store.history.push('/');
        return '';
    }

    return (
        <div id="playlist-cards">
        {
            (store.currentList != null) ?
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
            :
            returntoHomePage()
        }
        </div>
    )
}

export default PlaylistCards;