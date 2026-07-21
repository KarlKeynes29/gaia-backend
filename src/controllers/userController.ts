import { Request, Response } from 'express';
import { User } from '../models/index.ts';
import { RegisterInterface, changePasswordInterface } from '../interface/UserInterfaces.ts';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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

		await user.update({ password });

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

export const forgotPassword = async (req: Request<{}, {}, { email: string }>, res: Response) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: 'Email needed for verification!' });
	}

	try {
		const verifiedEmail = await User.findOne({ where: { email: email } });
		if (!verifiedEmail) {
			return res.status(404).json({ message: 'No matching email was found.' });
		}

		const resetToken = crypto.randomBytes(32).toString('hex');
		const tokenExpiration = new Date();
        tokenExpiration.setHours(tokenExpiration.getHours() + 1);

        await verifiedEmail.update({
            reset_password_token: resetToken,
            reset_password_expires: tokenExpiration
        });

        const resetUrl = `${process.env.BASE_URL}/forgot-password?token=${resetToken}`;

        const smtpPort = Number(process.env.SMTP_PORT);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: smtpPort,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: '"Cyber Gaia Security" <no-reply@cybergaia.com>',
            to: verifiedEmail.email,
            subject: 'Password Reset Request',
            text: `You requested a passoword reset! Please use the following link to set a new password: ${resetUrl}`,
            html: `
                <h3>Password Reset Request</h3>
                <p>You requested a password reset for your account.</p>
                <p>Click the link below to set a new password (valid for 1 hour):</p>
                <a href="${resetUrl}" target="_blank">Reset Password</a>
            `,
        });

        return res.status(200).json({
            message: 'Recovery instructions initilized.'
        });
	} catch (error) {
	 	console.error('Error in changing password for the account.', error);
        return res.status(500).json({ message: 'Internal Server Error' });
	}
}
