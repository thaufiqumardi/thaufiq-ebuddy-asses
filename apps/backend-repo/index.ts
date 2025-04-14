import { app } from './core/app';
import express from 'express';
import useRoutes from './routes/useRoutes';

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/", useRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
