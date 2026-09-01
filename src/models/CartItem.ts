import { Model, Sequelize, DataTypes } from 'sequelize';

export class CartItem extends Model {
    declare id: string;
    declare cart_id: string;
    declare game_id: string | null;
    declare item_id: string | null;
    declare quantity: number;
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
        item_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        game_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'cart_items',
        paranoid: true,
        underscored: true,
    }
    )
};
