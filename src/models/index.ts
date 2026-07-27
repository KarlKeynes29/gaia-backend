import { sequelize } from '../database';
import { User, initUserModel } from './User';
import { Game, initGameModel } from './Game';
import { Cart, initCartModel } from './Cart';
import { CartItem, initCartItemModel } from './CartItem';

initUserModel(sequelize);
initGameModel(sequelize);
initCartModel(sequelize);
initCartItemModel(sequelize);

User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { as: 'item' });

CartItem.hasMany(Game, { foreignKey: 'game_id' });
CartItem.belongsTo(Game);

export * from './User';
export * from './Game';
export * from './Cart';
export * from './CartItem';

export const initializeDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established!');
        // For dev onlyyyyyyyyyyyyyyyyyyy
        // alter: true
        await sequelize.sync({ alter: true });
        console.log("All models have been syncronized successfully.");
    } catch (error) {

        console.error('Unable to connect to the database:', error);
    }
};
