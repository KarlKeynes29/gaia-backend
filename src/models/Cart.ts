import { Model, Sequelize } from 'sequelize';
import { CartItem, User } from './index';
import { DataTypes } from 'sequelize';

export class Cart extends Model {
    declare id: string;
    declare user_id: string;
    declare status: 'ACTIVE' | 'ABANDONED' | 'CHECKED_OUT';
}

export const initCartModel = (sequelize: Sequelize) => {
    Cart.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    }, {
            sequelize,
            tableName: 'carts',
            paranoid: true,
            underscored: true,
    }) 
    Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
    Cart.belongsTo(User, { foreignKey: 'user_id' });
}