import express from 'express';
import {createConversation, getConversations} from '../controllers/conversations.js';
import {getMessages, createMessage} from '../controllers/messages.js';


const router = express.Router();

router.get('/conversations/:userId', getConversations);
router.post('/conversations/', createConversation);
router.get('/messages/:conversationId', getMessages);
router.post('/messages/', createMessage);



export default router;