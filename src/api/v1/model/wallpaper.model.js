const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wallpaperSchema = new Schema({
    clientId: {
        type: String,
        unique: true
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    title: {
        type: String
    },
    discription: {
        type: String
    },
    likeCount: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
const wallpaperModel = mongoose.model('wallpapers', wallpaperSchema)
module.exports = wallpaperModel