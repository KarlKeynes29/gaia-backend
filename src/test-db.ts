import { initializeDb, sequelize } from './database';
import { User, Game, Cart, CartItem } from './models';

const seed = async () => {
    try {
        await initializeDb();

        console.log('Starting Seeding...'); 

        const user = await User.create({
            username: 'Gamer29',
            password: 'hashmeifyoucan',
            first_name: 'Koyn',
            last_name: 'Arniil',
            email: 'text@sample.com',
            birthday: '1998-01-24',
            role: 'USER'
        });

        const game = await Game.create({
            title: 'CypherBunk123',
            description: 'A thrilling cyberpunk adventure game set in a dystopian future where players navigate a neon-lit city, hacking systems and uncovering conspiracies.',
            price: 60.00,
            is_available: true,
            on_discount: false,
            is_featured: true
        });

        const cart = await Cart.create({
            user_id: user.id,
            status: 'ACTIVE'
        });

        await CartItem.create({
            cart_id: cart.id,
            game_id: game.id,
            quantity: 1
        });

        console.log("Successful population of the Database!");

        const fullCart = await Cart.findOne({
            where: { userId: user.id },
            include: [{ 
                model: CartItem,
                include: [Game] 
            }]
        });

        console.log('Cart Items found:', fullCart?.items?.length);
        console.log('First Item in Cart is:', fullCart?.items[0]?.game.title);

    } catch (error) {
        console.error('Something went wrong while seeding the database:', error);
    } finally {
        await sequelize.close();
    }
};
seed();
