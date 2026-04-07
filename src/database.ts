import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { User, Game, Cart, CartItem } from './models';

// Database details
export const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!, 
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
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