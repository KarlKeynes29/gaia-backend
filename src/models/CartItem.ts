import { Model, Sequelize, DataTypes } from 'sequelize';
import { Game } from './index';

export class CartItem extends Model {
    declare id: string;
    declare cart_id: string;
    declare game_id: string;
    declare quantity: string;
}

export const initCartItemModel = (sequelize: Sequelize) => {
    CartItem.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        cart_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        game_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
        },
    }, {
            sequelize,
            tableName: 'cart_items',
            paranoid: true,
            underscored: true,
        }
    )
    Game.belongsTo(CartItem);
}
