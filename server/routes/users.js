import express from 'express';
import { register, login, find, logout, forgot, PostResetToken, editUser, verifyEmail, profile, GetResetToken, DeleteUser } from '../controllers/users.js';
const router = express.Router();
//const users = require('../controllers/users');
//const { isLoggedIn } = require('../middleware');


router.post('/register', register);

router.post('/login', login);

router.get('/find', find);

router.post('/logout', logout);

router.post('/forgot', forgot);

router.post('/reset/:token', PostResetToken);

router.post('/edit/:id', editUser);

router.get('/verify-email/:token', verifyEmail);

router.get('/profile/:id', profile);

router.get('/reset/:token', GetResetToken);

router.delete('/:id', DeleteUser);

export default router;