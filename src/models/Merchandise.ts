import { Model, DataTypes, Sequelize, DecimalDataType } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class Merchandise extends Model {
    declare id: string;
    declare name: string;
    declare description: string;
    declare price: number;
    declare stock_quantity: number;
    declare category: string;
    declare image_url: string;
    declare is_featured: boolean;
}

export const InitMerchandiseModel = (sequelize: Sequelize) => {
    Merchandise.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });
}
