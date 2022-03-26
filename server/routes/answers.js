import express from "express";

import { createAnswer } from "../controllers/answers.js";
//import { auth } from '../middleware/auth.js';

const router = express.Router();

//router.get('/', getAnswers);


router.post('/', createAnswer); // you need to be loged in to create a post

export default router;