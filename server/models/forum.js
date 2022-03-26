import mongoose from "mongoose";

const forumSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    commentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});
const Forum = mongoose.model('Forum', forumSchema);

export default Forum;
//module.exports = mongoose.model('Forum', forumSchema);