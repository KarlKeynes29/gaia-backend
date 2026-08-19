import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import { initializeDb } from './models';
import authRouter from './routers/authRouter';
import gameRouter from './routers/gameRouter';
import cartRouter from './routers/cartRouter';
import userRouter from './routers/userRouter';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/users', userRouter);

// Wildcard/generic express request handler.
// app.use('/api/v1/*', (req: Request, res: Response) => {
//     res.status(404).json({
//         message: ''
//     });
// });

app.get('/', (req: Request, res: Response) => {
    res.send('Gaia Store API is running!');
});

const initializeServer = async () => {
    try {
        await initializeDb();
        app.listen(PORT, () => {
            if (isProduction) {
                console.log(`Server is running at ${PORT}`);
            } else {
                console.log(`Server is running locally at http://localhost:${PORT}`);
            }
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}
initializeServer();
