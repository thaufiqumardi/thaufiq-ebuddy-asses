import express from 'express';
import userRoutes from '@/routes/useRoutes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

export { app };
