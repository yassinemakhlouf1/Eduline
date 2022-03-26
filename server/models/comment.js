import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    forumid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Forum"
    },
    content: String,
    name: String,
    creator: String,
    votes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
//module.exports = mongoose.model('Comment', commentSchema);