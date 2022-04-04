const express = require("express");

const answers = require("../controllers/answers.js");

const router = express.Router();

//router.get('/', getAnswers);


router.post('/', answers.createAnswer);

module.exports = router;