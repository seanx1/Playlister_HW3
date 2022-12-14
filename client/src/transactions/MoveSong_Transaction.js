//Taken from HW2 Solutions (and just modified)
import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldSongIndex, initNewSongIndex) {
        super();
        this.store = initStore;
        this.oldSongIndex = initOldSongIndex;
        this.newSongIndex = initNewSongIndex;
    }

    doTransaction() {
        this.store.moveSong(this.oldSongIndex, this.newSongIndex);
    }
    
    undoTransaction() {
        this.store.moveSong(this.newSongIndex, this.oldSongIndex);
    }
}

//DL
// import jsTPS_Transaction from '../common/jsTPS.js';
// /**
//  * MoveSong_Transaction
//  *
//  * This class represents a transaction that works with drag
//  * and drop. It will be managed by the transaction stack.
//  *
//  * @author McKilla Gorilla
//  * @author ?
//  */
// export default class MoveSong_Transaction extends jsTPS_Transaction {
//   constructor(store, initOldSongIndex, initNewSongIndex) {
//     super();
//     this.store = store;
//     this.oldSongIndex = initOldSongIndex;
//     this.newSongIndex = initNewSongIndex;
//   }

//   doTransaction() {
//     this.store.moveSong(this.oldSongIndex, this.newSongIndex);
//   }

//   undoTransaction() {
//     this.store.moveSong(this.newSongIndex, this.oldSongIndex);
//   }
// }

//Top5
// import jsTPS_Transaction from "../common/jsTPS.js"
// /**
//  * MoveItem_Transaction
//  * 
//  * This class represents a transaction that works with drag
//  * and drop. It will be managed by the transaction stack.
    
//     @author McKilla Gorilla
//  */
// export default class MoveItem_Transaction extends jsTPS_Transaction {
//     constructor(initStore, initOldIndex, initNewIndex) {
//         super();
//         this.store = initStore;
//         this.oldItemIndex = initOldIndex;
//         this.newItemIndex = initNewIndex;
//     }

//     doTransaction() {
//         this.store.moveItem(this.oldItemIndex, this.newItemIndex);
//     }
    
//     undoTransaction() {
//         this.store.moveItem(this.newItemIndex, this.oldItemIndex);
//     }
// }