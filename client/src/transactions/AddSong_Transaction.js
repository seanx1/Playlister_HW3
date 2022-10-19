//ADDED Taken from HW2 Solutions, just changing app to store basically. We know the transaction is just adding with default values.
import jsTPS_Transaction from '../common/jsTPS.js';
/**
 * AddSong_Transaction
 *
 * This class represents a transaction that adds a song to the
 * current playlist. It will be managed by the transaction stack.
 *
 * @author McKillaGorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
  constructor(store) {
    super();
    this.store = store;
  }

  doTransaction() {
    this.store.addSong('Untitled', 'Unknown', 'dQw4w9WgXcQ');
  }

  undoTransaction() {
    this.store.deleteSong(this.store.getPlaylistSize() - 1);
  }
}

//Taken from HW2 Solutions
// import jsTPS_Transaction from "../common/jsTPS.js"
// /**
//  * CreateSong_Transaction
//  * 
//  * This class represents a transaction that creates a song
//  * in the playlist. It will be managed by the transaction stack.
//  * 
//  * @author McKilla Gorilla
//  * @author ?
//  */
// export default class AddSong_Transaction extends jsTPS_Transaction {
//     constructor(initStore, initIndex, initSong) {
//         super();
//         this.store = initStore;
//         this.index = initIndex;
//         this.song = initSong;
//     }

//     doTransaction() {
//         this.store.createSong(this.index, this.song);
//     }
    
//     undoTransaction() {
//         this.store.removeSong(this.index);
//     }
// }

//DL
// import jsTPS_Transaction from '../common/jsTPS.js';
// /**
//  * AddSong_Transaction
//  *
//  * This class represents a transaction that adds a song to the
//  * current playlist. It will be managed by the transaction stack.
//  *
//  * @author 
//  */
// export default class AddSong_Transaction extends jsTPS_Transaction {
//   constructor(store) {
//     super();
//     this.store = store;
//   }

//   doTransaction() {
//     this.store.addSong('Untitled', 'Unknown', 'dQw4w9WgXcQ');
//   }

//   undoTransaction() {
//     this.store.deleteSong(this.store.getPlaylistSize() - 1);
//   }
// }

//Updated
// import jsTPS_Transaction from '../common/jsTPS.js';
// /**
//  * AddSong_Transaction
//  *
//  * This class represents a transaction that adds a song to the
//  * current playlist. It will be managed by the transaction stack.
//  *
//  * @author
//  */
// export default class AddSong_Transaction extends jsTPS_Transaction {
//   constructor(store) {
//     super();
//     this.store = store;
//   }

//   doTransaction() {
//     const song = {
//       title: 'Untitled',
//       artist: 'Unknown',
//       youTubeId: 'dQw4w9WgXcQ',
//     };
//     this.store.addSong(this.store.getPlaylistSize() - 1, song);
//   }

//   undoTransaction() {
//     this.store.deleteSong(this.store.getPlaylistSize() - 1);
//   }
// }