import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { LoginInterface } from '../src/interface/AuthInterface';

export const login = async (req: Request<{}, {}, LoginInterface>, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.scope('withPassword').findOne({ where: email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Password does not match' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )


    } catch (error) {

    }
}

