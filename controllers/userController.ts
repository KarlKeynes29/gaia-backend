import { Request, Response } from 'express';
import { User } from '../src/models/index.ts';
import { RegisterInterface, UserParams } from '../src/interface/UserInterfaces.ts';

export const updateUserDetails = async (req: Request<{ id: string }, any, Partial<RegisterInterface>>, res: Response) => {
    const { firstName, middleName, lastName, username,email, birthday, phoneNumber, address, role } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        if (user) {
            await user.update({
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                username: username,
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

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
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
