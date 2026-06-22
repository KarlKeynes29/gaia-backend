import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { initializeDb } from './models/index';
import { authRouter } from '../routers/authRouter';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Gaia Store API is running!');
});

const initializeServer = async () => {
    try {
        await initializeDb();
        app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}
initializeServer();
