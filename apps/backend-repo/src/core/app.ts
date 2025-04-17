import express from 'express';
import cors from 'cors';
import useRoutes from '../routes/useRoutes';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))


app.use("/", useRoutes)

export { app };
