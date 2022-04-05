const express = require("express");

const answers = require("../controllers/answers.js");

const router = express.Router();

//router.get('/', getAnswers);


router.post('/', answers.createAnswer);
//ajouter votes et delete routers

router.patch('/:id/plusVote', answers.plusVote);
module.exports = router;