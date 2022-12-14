const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

// createPlaylist = (req, res) => {
//     const body = req.body;
//     console.log("createPlaylist body: " + body);

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a Playlist',
//         })
//     }

//     const playlist = new Playlist(body);
//     console.log("playlist: " + JSON.stringify(body));
//     if (!playlist) {
//         return res.status(400).json({ success: false, error: err })
//     }

//     playlist
//         .save()
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 playlist: playlist,
//                 message: 'Playlist Created!',
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: 'Playlist Not Created!',
//             })
//         })
// }

//ADDED This function updates the playlist with ID
updatePlaylistById = async (req, res) => {
    const body = req.body;
    console.log('updatePlaylist body: ' + body);

    //Not sure if this breaks anything
    const playlist = new Playlist(body);

    // if (!body.name) {
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
        // return res.status(400).json({
        //     success: false,
        //     error: 'You must provide a new name',
        // });
    }

    Playlist.findOne({ _id: req.params.id }, (err, Playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist with id not found!',
            })
        }
        Playlist.name = body.name
        Playlist.songs = body.songs
        Playlist
            .save()
            .then(() => {
                console.log("Success updating song!!!");
                return res.status(200).json({
                    success: true,
                    id: Playlist._id,
                    message: 'Playlist updated!',
                })
            })
            .catch(error => {
                console.log("Failure: " + JSON.stringify(error));
                return res.status(404).json({
                    error: "Failed to update playlist",
                    message: 'Playlist not updated!',
                })
            })
    })
}

deletePlaylistById = async (req, res) => {
    console.log('deletePlaylist called on id: ' + req.params.id);
    await Playlist.findOneAndDelete({ _id: req.params.id }, (err, list) => {
        if (err) {
            // console.log("deletePlaylist failed in server")
            return res.status(400).json({ success: false, error: 'delete Playlist by ID has failed' });
        }
        return res.status(200).json({ success: true });
    }).catch(err => {
        console.log("error caught in deletePlaylist by ID: " + err);
        return res.status(400).json({ success: false })
    })
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylistById,
}

// updatePlaylistById,
// deletePlaylistById,