import jsTPS_Transaction from '../common/jsTPS.js';
/**
 * EditSong_Transaction
 *
 * This class represents a transaction that edit a song in the
 * current playlist. It will be managed by the transaction stack.
 *
 * @author
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
  constructor(store, songIndex, uneditedSong, editedSong) {
    super();
    this.store = store;
    this.songIndex = songIndex;
    this.uneditedSong = uneditedSong;
    this.editedSong = editedSong;
  }

  doTransaction() {
    this.store.editSong(this.songIndex, this.editedSong);
  }

  undoTransaction() {
    this.store.editSong(this.songIndex, this.uneditedSong);
  }
}

//Taken from HW2 Solutions
// import jsTPS_Transaction from "../common/jsTPS.js"

// /**
//  * DeleteSong_Transaction
//  * 
//  * This class represents a transaction that deletes a song
//  * in the playlist. It will be managed by the transaction stack.
//  * 
//  * @author McKilla Gorilla
//  * @author ?
//  */
// export default class RemoveSong_Transaction extends jsTPS_Transaction {
//     constructor(initApp, initIndex, initSong) {
//         super();
//         this.app = initApp;
//         this.index = initIndex;
//         this.song = initSong;
//     }

//     doTransaction() {
//         this.app.removeSong(this.index);
//     }
    
//     undoTransaction() {
//         this.app.createSong(this.index, this.song);
//     }
// }

//DL Updated
// import jsTPS_Transaction from '../common/jsTPS.js';
// /**
//  * EditSong_Transaction
//  *
//  * This class represents a transaction that edit a song in the
//  * current playlist. It will be managed by the transaction stack.
//  *
//  * @author
//  */
// export default class EditSong_Transaction extends jsTPS_Transaction {
//   constructor(store, songIdx, uneditedSong, editedSong) {
//     super();
//     this.store = store;
//     this.songIdx = songIdx;
//     this.uneditedSong = uneditedSong;
//     this.editedSong = editedSong;
//   }

//   doTransaction() {
//     this.store.editSong(this.songIdx, this.editedSong);
//   }

//   undoTransaction() {
//     this.store.editSong(this.songIdx, this.uneditedSong);
//   }
// }

//Top5
// import jsTPS_Transaction from "../common/jsTPS.js"

// /**
//  * UpdateItem_Transaction
//  * 
//  * This class represents a transaction that updates the text
//  * for a given item. It will be managed by the transaction stack.
    
//     @author McKilla Gorilla
//  */
// export default class UpdateItem_Transaction extends jsTPS_Transaction {
//     constructor(initStore, initIndex, initOldText, initNewText) {
//         super();
//         this.store = initStore;
//         this.index = initIndex;
//         this.oldText = initOldText;
//         this.newText = initNewText;
//     }

//     doTransaction() {
//         this.store.updateItem(this.index, this.newText);
//     }
    
//     undoTransaction() {
//         this.store.updateItem(this.index, this.oldText);
//     }
// }