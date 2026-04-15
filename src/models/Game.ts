// Note to import from sequelize-typescript instead of sequelize to avoid type errors when you're using TS.
import { Model, DataTypes, Sequelize } from 'sequelize';

export class Game extends Model {
    declare id: string;
    declare title: string;
    declare description: string;
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


