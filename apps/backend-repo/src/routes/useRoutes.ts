import { Router } from 'express';
import { handleFetchUser, handleUpdateUser } from '@/controller/user';
import { authenticate } from '@/middleware/authMiddleware';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello this is backend for my assessment at e-buddy job application' });
});

router.get('/fetch-user-data', authenticate, handleFetchUser);

router.route('/update-user-data')
  .post(authenticate, handleUpdateUser)
  .put(authenticate, handleUpdateUser);


export default router;
