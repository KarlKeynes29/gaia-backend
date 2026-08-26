import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

import { User } from '../models/User.ts';
import { LoginInterface } from '../interface/AuthInterface.ts';
import { RegisterInterface } from '../interface/UserInterfaces.ts';

// Study note: This is not used anymore because I made the 'user'
// export interface AuthRequest extends Request {
//     user?: {
//         id: string;
//         role: string;
//     }
// }

export const verify = async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET;
    try {
        // My notes for study:
        // get the entire value of the headers.authorization
        const authHeader = req.headers.authorization;
        // split it so you get only the token and use it
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

		if (!secret) {
    		return res.status(500).json({ message: "Server configuration error: Secret missing." });
		}

        const decoded = jwt.verify(token, secret as string) as { id: string, role: string };

        req.user = decoded;

        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || req.user?.role.toUpperCase() !== 'ADMIN') {
    	   return res.status(403).json({ message: 'Account does not have admin privilege!' });
        }
        next();
    } catch (error) {
        console.error('User does not have admin privileges.', error);
        next(error);
    }
};

export const register = async (req: Request<{}, {}, RegisterInterface>, res: Response) => {
    const { username, password, firstName, middleName, lastName, email, birthday, phoneNumber, address } = req.body;

    try {
        let formattedBirthday: Date | null = null;
        if (birthday && birthday.trim() != '') {
            formattedBirthday = new Date(`${birthday.trim()}T00:00:00.000Z`);
        }

        const user = await User.create({
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
            username: username,
            password: password || null,
            email: email,
            birthday: formattedBirthday,
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
        const { identity, password } = req.body;
        // I use scope() due to the scope object added to the User model relating to passwords--it's needed.
        const user = await User.scope('withPassword').findOne({
            where: {
                [Op.or]: [
                    { email: identity },
                    { username: identity }
                ]
            }
        });

        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateToken();
        const userRole = user.role;
        const prettyRole = userRole.charAt(0) + userRole.slice(1).toLocaleLowerCase();

        return res.status(200).json({
            message: `Login successful, welcome ${prettyRole}!`,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: userRole
            },
        });
    } catch (error) {
        console.error('Error in logging the user in.', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const verifyResetPasswordToken = async (req: Request, res: Response) => {
    const { userId, token } = req.body;



}
