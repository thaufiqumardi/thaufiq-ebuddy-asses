import { Router } from 'express';
import { getUsers } from '../controller/api';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello' });
});

router.get('/users', authenticate, getUsers);

export default router;
