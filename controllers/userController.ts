import { Request, Response } from 'express';
import { User } from '../src/models/User';

export const createUser = async ( req: Request, res: Response ) => {
    const { firstName, middleName, lastName, email, birthday, phoneNumber, address, role } = req.body;

    try { 
        const user = await User.create({
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            email: email,
            birthday: birthday,
            phone_number: phoneNumber,
            address: address,
            role: role
        });

    } catch (error) {
        console.error('Error in creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(201).json({
        message: 'User created successfully!',
        user: { }
    });
};
