import { Table, Column, Model, DataType, DefaultScope, Scopes } from 'sequelize-typescript';

@DefaultScope(() => ({
    // attributes: { exclude: ['password'] }

    // This method is more explicit, but you have to add the name of the new column if another one is added hehehe.
    attributes: [ 'id', 'username', 'first_name', 'middle_name', 'last_name', 'email', 'birthday', 'phone_number', 'address', 'role' ]
}))
@Scopes(() => ({
    withPassword: { attributes: { include: ['password'] } }
}))
@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model {
    @Column({
       type: DataType.UUID,
       defaultValue: DataType.UUIDV4,
       primaryKey: true
    }) 
    id!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: false
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        get() { return this.getDataValue('password'); }
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: false
    })
    first_name!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: true
    })
    middle_name!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: true
    })
    last_name!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: false,
        unique: true
    })
    email!: string;

    @Column({
        type: DataType.DATEONLY,
        defaultValue: null,
        allowNull: true
    })
    birthday!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: true
    })
    phone_number!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: true
    })
    address!: string;

    @Column({
        type: DataType.ENUM('ADMIN', 'USER'),
        defaultValue: 'USER',
        allowNull: false
    })
    role!: string;
}