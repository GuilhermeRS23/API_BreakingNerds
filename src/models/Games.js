import mongoose from "mongoose";

const GamesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    likes: {
        type: Array,
        require: true
    },
    comment: {
        type: Array,
        require: true
    }
})

const Games = mongoose.model("Games", GamesSchema);

export default Games;
