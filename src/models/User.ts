import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class User extends Model {
	declare id: string;
	declare first_name: string;
	declare middle_name: string | null;
	declare last_name: string;
	declare username: string;
	declare password: string;
	declare email: string;
	declare birthday: Date | null;
	declare phone_number: string | null;
	declare address: string | null;
	declare role: 'USER' | 'ADMIN';
	declare deleted_at: Date | null;

	public async validatePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}

	public generateToken(): string {
		const secret: string = process.env.JWT_SECRET || 'fallbacksecret291996';
		
		if (!secret) {
			throw new Error('JTW_SECRET is not defined in environment variables.');
		}
		
		return jwt.sign(
			{
				id: this.id,
				role: this.role
			},
			secret,
			{ expiresIn: '1d' }
		);	
	}
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	middle_name: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			// length from min to max
			len: [8, 128],
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	birthday: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: null
	},
	phone_number: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null
	},
	address: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'USER'
	},
	deleted_at: {
		type: DataTypes.DATE,
		allowNull: true,
	}
	}, {
	sequelize,
	tableName: 'users',
	hooks: {
		beforeCreate: async (user: User) => {
			user.password = await bcrypt.hash(user.password, 10);
		},
		beforeUpdate: async (user: User) => {
			if (user.changed('password')) {
				user.password = await bcrypt.hash(user.password, 10);
			}
		},
		beforeValidate: async (user: User) => {
			if (user.password) {

			}
		}
	},
	paranoid: true,
	underscored: true, 
	defaultScope: {
		attributes: { exclude: ['password'] }
	},
	scopes: {
		withPassword: {
			attributes: { include: ['password'] },
		}
	}
	});
};