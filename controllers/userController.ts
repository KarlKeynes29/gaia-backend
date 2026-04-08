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
            birthday: birthday,
            phone_number: phoneNumber || null,
            address: address,
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

interface UpdateBody {
    firstName: string;
}
export const updateUserDetails = async (req: Request<UserParams, any, UpdateBody>, res: Response) => {
    const { firstName, middleName, lastName, email, birthday, phoneNumber, address, role } = req.body;
    
    try {

    } catch (error) {
        console.error('Error in updating user details:', error);
        return res.status(500).json({ message: 'Internal Server Error' });  
    }
}
