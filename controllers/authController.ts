import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

import { User } from '../src/models/index.ts';
import { LoginInterface } from '../src/interface/AuthInterface';
import { RegisterInterface } from '../src/interface/UserInterfaces.ts';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    }
}

export const verify = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // My notes for study:
        // get the entire value of the headers.authorization
        const authHeader = req.headers.authorization;
        // split so you get only the token and use it
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret) as { id: string, role: string };

        req.user = decoded; 

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

export const register = async (req: Request<{}, {}, RegisterInterface>, res: Response) => {
    const { firstName, middleName, lastName, username, email, birthday, phoneNumber, address } = req.body;

    try { 
        const user = await User.create({
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
            username: username,
            email: email,
            birthday: birthday || null,
            phone_number: phoneNumber || null,
            address: address || null,
        });

        return res.status(201).json({
            message: 'User created successfully!',
            user: { id: user.id }
        });
    } catch (error) {
        console.error('Error in creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const login = async (req: Request<{}, {}, LoginInterface>, res: Response) => {
    try {
        const { loginValue, password } = req.body;
        // I use scope() due to the scope object added to the User model relating to passwords.
        const user = await User.scope('withPassword').findOne({
            where: {
                [Op.or]: [
                    { 
                        email: loginValue,
                        username: loginValue
                    }
                ]
            }
        });
        // Study note: the second condition only happens if the first one is falsy, meaning, 
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateToken();

        return res.status(200).json({
            message: 'Login successful!',
            token,
            user: user.id
        });
    } catch (error) {
        console.error('Error in logging the user in.', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
