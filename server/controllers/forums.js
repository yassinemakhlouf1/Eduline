const Forum = require("../models/forum.js");
const mongoose = require("mongoose");

module.exports.getForums = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await Forum.countDocuments({});
        const forums =  await Forum.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        //console.log(Forum);
        res.status(200).json({ data: forums, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.getForum = async (req, res) => {
    const { id } = req.params;
    try {
        const forum =  await Forum.findById(id);
        res.status(200).json(forum);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.getForumsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i'); // Test test TEST -> test
        const forums = await Forum.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        res.json({ data: forums });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.createForum = async (req, res) => {
    const forum = req.body;
    const newForum = new Forum({ ...forum, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newForum.save();
        res.status(201).json(newForum);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

module.exports.updateForum = async (req, res) => {
    const { id: _id } = req.params;
    const forum = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No forum with that id!!');

    const updatedForum = await Forum.findByIdAndUpdate(_id, { ...forum, _id }, { new: true });
    res.json(updatedForum);
};

module.exports.deleteForum = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No forum with that id!!');
    await Forum.findByIdAndRemove(id);
    res.json({ message: 'Forum deleted successfully' });
};

module.exports.likeForum = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.json({ message: 'Unauthenticated' });
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No forum with that id!!');
    const forum = await Forum.findById(id);
    const index = forum.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        forum.likes.push(req.userId);
    } else {
        forum.likes = forum.likes.filter((id) => id !== String(req.userId));
    }
    const updatedForum = await Forum.findByIdAndUpdate(id, forum, { new: true });

    res.json(updatedForum);
};

module.exports.commentForum = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const forum = await Forum.findById(id);
    forum.comments.push(value);
    const updatedForum = await Forum.findByIdAndUpdate(id, forum, { new: true });

    res.json(updateForum);
}