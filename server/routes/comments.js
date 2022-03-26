import express from "express";

import { createComment, deleteComment } from "../controllers/comments.js";
//import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/:id', createComment); // you need to be loged in to create a comment
router.delete('/comments/:id', deleteComment);
export default router;