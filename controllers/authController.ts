import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../src/models/index.ts';
import { LoginInterface } from '../src/interface/AuthInterface';

export const login = async (req: Request<{}, {}, LoginInterface>, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.scope('withPassword').findOne({ where: { email: email }});

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Password does not match' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )
        // Note for myself (study): Accesses the extra details inside the object sent by sequelize aside from the actual query.
        // We're accessing the actual password, declaring a variable named "_".
        // This is redundant because of the defaultScope which already doesn't include the password. BUT if the scope is accidentally altered to include the password, this will still stop it.
        // by writing a non-existent "userWithoutPassword" this way, you declare it here and putting all other contents except password to this new object. :D
        const { password: _, ...userDetailsWithoutPassword } = user.get();

        return res.status(200).json({
            message: 'Login successful!',
            token,
            user: userDetailsWithoutPassword
        });
        
    } catch (error) {
        console.error('Error in logging the user in.', error);
    }
}
