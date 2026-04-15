import { Model, DataTypes, Sequelize } from 'sequelize';

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
  declare role: string;
  declare deleted_at: Date | null;
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
			// length :D
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
        defaultValue: 'user'
    },
    deleted_at: {
		type: DataTypes.DATE,
		allowNull: true,
    }
  	}, {
	sequelize,
	tableName: 'users',
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