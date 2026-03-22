import { Sequelize } from 'sequelize-typescript';
import { User, Game, Cart, CartItem } from './src/models';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: 'postgres',
    password: 'password1234',
    database: process.env.DB_NAME || 'gaia_backend',
    models: [User, Game, Cart, CartItem],
});

export const initializeDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established!');
        // For dev onlyyyyyyyyyyyyyyyyyyy
        // alter: true <- changes but thinks about constrainst of the table
        await sequelize.sync({ force: true });
        console.log("All models have been syncronized successfully.");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};