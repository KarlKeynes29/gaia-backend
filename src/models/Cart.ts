import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User, CartItem } from './index';

// ** Note to self: **
// When using sequelize-typescript with decorators, it's crucial to ensure that the TypeScript compiler options are set correctly to support experimental decorators and emit metadata. This allows Sequelize to properly interpret the model definitions and relationships. Make sure to include "experimentalDecorators": true and "emitDecoratorMetadata": true in your tsconfig.json file to avoid any issues with model recognition and association handling.

@Table({
    tableName: 'carts'
})

export class Cart extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    id!: string;  

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId!: string;

    @Column({
        type: DataType.ENUM('ACTIVE', 'ABANDONED', 'CHECKED_OUT'),
        defaultValue: 'ACTIVE',
        allowNull: false
    })
    status!: string;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => CartItem)
    items!: CartItem[];
}