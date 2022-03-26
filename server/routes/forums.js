import express from 'express';

import { isLoggedIn } from '../middleware.js';
//import auth from '../middleware/auth.js';
import { getForumsBySearch, getForums, getForum, createForum, updateForum, deleteForum, likeForum, commentForum } from "../controllers/forums.js";
const router = express.Router();

router.get('/search', getForumsBySearch);
router.get('/', getForums);
router.get('/:id', getForum);

router.post('/', createForum); // you need to be loged in to create a post
router.patch('/:id', updateForum);
router.delete('/:id', deleteForum);
router.patch('/:id/likeForum', likeForum);
router.post('/:id/commentForum', commentForum);

export default router;