import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects'
import taskRoutes from './routes/task'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});

export default app;