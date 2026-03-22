import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
        allowNull: false
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: false
    })
    firstName!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: true
    })
    middleName!: string;

    @Column({
        type: DataType.STRING,
        defaultValue: '',
        allowNull: true
    })
    lastName!: string;

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
    phoneNumber!: string;

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