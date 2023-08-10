import express from 'express';
import { authMiddleware } from '../shared/utils/authMiddleware';
import { createJobPost, deleteJobPost, editJobPost } from '../controllers/jobcontroller';
import JobPost from '../models/JobPost';

const router = express.Router();

router.post('/', authMiddleware, (req, res) => createJobPost(req, res, JobPost));
router.put('/:id', authMiddleware, (req, res) => editJobPost(req, res, JobPost));
router.delete('/:id', authMiddleware, (req, res) => deleteJobPost(req, res, JobPost));

export default router;
