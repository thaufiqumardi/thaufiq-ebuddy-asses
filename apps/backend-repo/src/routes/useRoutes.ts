import { Router } from 'express';
import { handleCreateUser, handleFetchUser, handleUpdateUser } from '../controller/user';
import { authenticate } from '../middleware/authMiddleware';
import { handleAuthLogin } from '../controller/auth';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello this is backend for my assessment at e-buddy job application' });
});

router.get('/fetch-user-data', authenticate, handleFetchUser);

router.post('/update-user-data', authenticate, handleCreateUser);
router.put('/update-user-data', authenticate, handleUpdateUser);

router.post('/login', handleAuthLogin);


export default router;
