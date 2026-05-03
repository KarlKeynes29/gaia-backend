import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../src/models/index.ts';
import { RegisterInterface, changePasswordInterface } from '../src/interface/UserInterfaces.ts';

export const getUserDetails = async (req: Request<{ id: string }>, res: Response) => {
	const { id } = req.params;
	
	try {
		const user = await User.findByPk(id);
		
		if (!user) {
			return res.status(404).json({ message: 'User not found while fetching.' });
		}

		return res.status(200).json(user);
	} catch (error) {
		console.error('Error in fetching user details:', error);
		return res.json(500).json({ message: 'Internal Server Error' });
	}
};

export const changePassword = async (req: Request<{ id: string }, {}, changePasswordInterface>, res: Response) => {
	const { password } = req.body;
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found!' });
		}
		//Notes:
		// Dictate salt, hash the password, and then update 
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		await user.update({ hashedPassword });

		return res.status(200).json({ message: 'Password was successfully updated!' });
		
	} catch (error) {
		console.error('Error in changing password for user:', error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

export const updateUserDetails = async (req: Request<{ id: string }, any, Partial<RegisterInterface>>, res: Response) => {
    const { firstName, middleName, lastName, username,email, birthday, phoneNumber, address, role } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found!' });
		}
		
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
        
        return res.json({
            message: 'User details updated successfully!',
		});
		
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
