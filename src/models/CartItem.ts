import { DataType, Model, ForeignKey, BelongsTo, Sequelize, DataTypes } from 'sequelize';
import { Cart, Game } from './index';

export const initCartItemModel = (sequelize: Sequelize) => {
    Cart.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        }, {
        sequelize,
        tableName: 'cart_item',
        paranoid: true,
        underscored: true,
        }
    )
}