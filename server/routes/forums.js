const express = require('express');

const { isLoggedIn } = require('../middleware');
//import auth from '../middleware/auth.js';
const forums = require("../controllers/forums.js");
const router = express.Router();

router.get('/search', forums.getForumsBySearch);
router.get('/', forums.getForums);
router.get('/:id', forums.getForum);

router.post('/', forums.createForum); // you need to be loged in to create a post
router.patch('/:id', isLoggedIn, forums.updateForum);
router.delete('/:id', isLoggedIn, forums.deleteForum);
router.patch('/:id/likeForum', isLoggedIn, forums.likeForum);
router.post('/:id/commentForum', isLoggedIn, forums.commentForum);

module.exports = router;