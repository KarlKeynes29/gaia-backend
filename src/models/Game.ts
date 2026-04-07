// Note to import from sequelize-typescript instead of sequelize to avoid type errors when you're using TS.
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'games',
    timestamps: true,
})
export class Game extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    })
    price!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    is_available!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    on_discount!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    is_featured!: boolean;
}