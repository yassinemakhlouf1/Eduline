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

    try {
        await newAnswer.save();
        res.status(201).json(newAnswer);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};