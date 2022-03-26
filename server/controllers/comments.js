import Comment from "../models/comment.js";
import mongoose from "mongoose";

export const createComment = async (req, res) => {
    const comment = req.body;
    const newComment = new Comment({ ...comment, forumid: req.params.id, createdAt: new Date().toISOString() });

    try {
        await newComment.save();
        res.status(201).json(newComment);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No comment with that id!!');
    await Comment.findByIdAndRemove(id);
    res.json({ message: 'Comment deleted successfully' });
};