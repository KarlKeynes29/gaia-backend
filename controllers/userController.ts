import { Request, Response } from 'express';
import { User } from '../src/models/User';
import { CreateUserInterface } from '../src/interface/CreateUserInterface.ts';

export const createUser = async (req: Request<{}, {}, CreateUserInterface>, res: Response) => {
    const { firstName, middleName, lastName, email, birthday, phoneNumber, address } = req.body;

    try { 
        const user = await User.create({
            first_name: firstName,
            middle_name: middleName || null,
            last_name: lastName,
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

interface UserParams {
    id: string;
}

export const updateUserDetails = async (req: Request<UserParams, any, Partial<CreateUserInterface>>, res: Response) => {
    const { firstName, middleName, lastName, email, birthday, phoneNumber, address, role } = req.body;

    try {
        const user = await User.findByPk(req.params.id);

        if (user) {
            await user.update({
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                email: email,
                birthday: birthday,
                phone_number: phoneNumber,
                address: address,
                role: role
            });

            res.json({
                message: 'User details updated successfully!',
                user: { id: user.id}
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in updating user details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });  
    }
}

export const deleteUser = async (req: Request<UserParams>, res: Response) => {
    const userId = req.params.id
    try {
        const user = await User.findByPk(userId);

        if (user) {
            await user.update({ deletedAt: new Date()});
        }
    } catch (error) {
        console.error('Error in deleting user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
