import { Sequelize } from 'sequelize-typescript';
import { User, Game, Cart, CartItem } from './src/models';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: (log) => console.log(log),
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'gaia_backend',
    models: [User, Game, Cart, CartItem]
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