//Taken from HW2 Solutions
import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * UpdateSong_Transaction
 * 
 * This class represents a transaction that updates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex, initOldSongData, initNewSongData) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.oldSongData = initOldSongData;
        this.newSongData = initNewSongData;
    }

    doTransaction() {
        this.app.updateSong(this.index, this.newSongData);
    }
    
    undoTransaction() {
        this.app.updateSong(this.index, this.oldSongData);
    }
}

//DL Updated
// import jsTPS_Transaction from '../common/jsTPS.js';
// /**
//  * RemoveSong_Transaction
//  *
//  * This class represents a transaction that removes a song at the index
//  *  of the current playlist. It will be managed by the transaction stack.
//  *
//  * @author
//  */
// export default class RemoveSong_Transaction extends jsTPS_Transaction {
//   constructor(store, songIdx) {
//     super();
//     this.store = store;
//     this.songIdx = songIdx;
//   }

//   doTransaction() {
//     this.removedSong = this.store.deleteSong(this.songIdx);
//   }

//   undoTransaction() {
//     this.store.addSong(this.songIdx, this.removedSong);
//   }
// }