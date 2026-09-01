import { faker } from '@faker-js/faker';
import { sequelize, User, Game, MerchItem, Cart, CartItem } from '../models';

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log('Creating users...');
    const users = [];

    const adminUser = await User.create({
      first_name: 'Admin',
      middle_name: null,
      last_name: 'User',
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
      birthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
      phone_number: faker.phone.number(),
      address: faker.location.streetAddress({ useFullAddress: true }),
      role: 'ADMIN',
    });
    users.push(adminUser);

    for (let i = 0; i < 20; i++) {
      const user = await User.create({
        first_name: faker.person.firstName(),
        middle_name: faker.helpers.maybe(() => faker.person.middleName(), { probability: 0.5 }) || null,
        last_name: faker.person.lastName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthday: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
        phone_number: faker.phone.number(),
        address: faker.location.streetAddress({ useFullAddress: true }),
        role: 'USER',
        reset_password_token: null,
        reset_password_expires: null,
      });
      users.push(user);
    }

    console.log('Creating games...');
    const games = [];
    const genres = ['Action', 'RPG', 'Strategy', 'Indie', 'Adventure', 'FPS'];
    for (let i = 0; i < 20; i++) {
      const game = await Game.create({
        title: `${faker.word.adjective()} ${faker.word.noun()}`,
        description: faker.lorem.paragraph(),
        genre: faker.helpers.arrayElement(genres),
        image: faker.image.url({ width: 400, height: 600, }),
        price: parseFloat(faker.commerce.price({ min: 9.99, max: 69.99 })),
        is_available: faker.datatype.boolean({ probability: 0.9 }),
        is_featured: faker.datatype.boolean({ probability: 0.25 }),
      });
      games.push(game);
    }

    console.log('Creating merch items...');
    const merchItems = [];
    const sources = ['Cyberpunk Collection', 'Retro Series', 'Official Apparel', 'Limited Edition'];

    for (let i = 0; i < 20; i++) {
      const merch = await MerchItem.create({
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        source: faker.helpers.arrayElement(sources),
        image: faker.image.url({ width: 400, height: 400 }),
        price: parseFloat(faker.commerce.price({ min: 14.99, max: 119.99 })),
        is_available: faker.datatype.boolean({ probability: 0.85 }),
        is_featured: faker.datatype.boolean({ probability: 0.2 }),
        stock_quantity: faker.number.int({ min: 0, max: 100 }),
      });
      merchItems.push(merch);
    }

      console.log('Creating carts and cart items...');
      for (const user of users) {
        const cart = await Cart.create({
            user_id: user.id,
            status: 'ACTIVE',
        });``


    console.log('Creating carts and cart items...');
    for (const user of users) {

      const cart = await Cart.create({
        user_id: user.id,
        status: 'ACTIVE',
      });

      const randomGame = faker.helpers.arrayElement(games);
      await CartItem.create({
        cart_id: cart.id,
        game_id: randomGame.id,
        item_id: null,
        quantity: faker.number.int({ min: 1, max: 2 }),
      });

      const randomMerch = faker.helpers.arrayElement(merchItems);
      await CartItem.create({
        cart_id: cart.id,
        game_id: null,
        item_id: randomMerch.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
      });
    }

      const randomGame = faker.helpers.arrayElement(games);
      await CartItem.create({
        cart_id: cart.id,
        game_id: randomGame.id,
        item_id: null,
        quantity: faker.number.int({ min: 1, max: 2 }),
      });

      const randomMerch = faker.helpers.arrayElement(merchItems);
      await CartItem.create({
        cart_id: cart.id,
        game_id: null,
        item_id: randomMerch.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
      });
    }

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
