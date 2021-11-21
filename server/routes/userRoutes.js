import express from 'express';
import { login, signup, getUsers } from '../controllers/user.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/:userIds', getUsers);

export default router;