const Answer = require("../models/answer.js");
const mongoose = require("mongoose");

module.exports.getAnswers = async (req, res) => {
    try {
        const answers =  await Answer.find();
        res.status(200).json({ data: answers });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.createAnswer = async (req, res) => {
    const answer = req.body;
    const newAnswer = new Answer({ ...answer, createdAt: new Date().toISOString() });
    //console.log(req.body);
    try {
        await newAnswer.save();
        res.status(201).json(newAnswer);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

//ajoter les controlleurs de votes et supprission

module.exports.plusVote = async (req, res) => {
    
    const { id } = req.params;
    const { value } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No answer with that id!!');
    const answer = await Answer.findById(id);
    const index = answer.votesPlus.findIndex((id) => id === String(value));
    if(index === -1){
        answer.votesPlus.push(value);
    } else {
        answer.votesPlus = answer.votesPlus.filter((id) => id !== String(value));
    }
    //answer.votesPlus.push(value);
    const updatedAnswer = await Answer.findByIdAndUpdate(id, answer, { new: true });

    res.json(updatedAnswer);
};