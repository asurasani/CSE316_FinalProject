const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        likes: {type: [], required: true},
        dislikes: {type: [], required: true},
        likesCount: { type: Number },
        dislikesCount: { type: Number },
        publish: {type: Boolean, require: true},
        publishDate: {type: String, require: true},
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        comments: {type: [{
            name: String,
            comment: String
        }], required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
