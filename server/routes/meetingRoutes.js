import express from 'express';
import { getMeetings, createMeeting, updateMeeting, deleteMeeting } from '../controllers/meeting.js';


const router = express.Router();

router.get('/:id', getMeetings);
router.post('/', createMeeting);
router.patch('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

export default router;