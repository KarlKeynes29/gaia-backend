import { sequelize } from '../database';
import { User, initUserModel } from './User';
import { Game, initGameModel } from './Game';
import { Cart, initCartModel } from './Cart';
import { CartItem, initCartItemModel } from './CartItem';
import { MerchItem, initMerchItemModel } from './MerchItem';

initUserModel(sequelize);
initGameModel(sequelize);
initCartModel(sequelize);
initCartItemModel(sequelize);
initMerchItemModel(sequelize);

User.hasOne(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id' as 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

Game.hasMany(CartItem, { foreignKey: 'game_id' });
CartItem.belongsTo(Game, { foreignKey: 'game_id' });

MerchItem.hasMany(CartItem, { foreignKey: 'item_id' });
CartItem.belongsTo(MerchItem, { foreignKey: 'item_id' });

export { sequelize };
export * from './User';
export * from './Game';
export * from './Cart';
export * from './CartItem';
export * from './MerchItem';

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
