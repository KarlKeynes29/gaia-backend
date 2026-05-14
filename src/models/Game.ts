import { Model, DataTypes, Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class Game extends Model {
    declare id: string;
    declare title: string;
    declare description: string;
    declare genre: string;
    declare image: string;
    declare price: number;
    declare is_available: boolean;
    declare is_featured: boolean;
}

export const initGameModel = (sequelize: Sequelize) => {
    Game.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            defaultValue: null,
            allowNull: false
        },
        image: {
            type: DataType.STRING,
            defaultValue: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=600',
            allowNull: false
        },
        price: {
            type: DataTypes.NUMBER,
            defaultValue: null,
            allowNull: false,
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            sequelize,
            tableName: 'games',
            paranoid: true,
            underscored: true,
    });
};
