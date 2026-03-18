import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cart, Game } from './index';

@Table({
    tableName: 'cart_items',
    timestamps: true,
})

export class CartItem extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    id!: string;

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    cartId!: string;

    @ForeignKey(() => Game)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    gameId!: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 1,
        allowNull: false
    })
    quantity!: number;

    @BelongsTo(() => Cart)
    cart!: Cart;

    @BelongsTo(() => Game)
    game!: Game;
}