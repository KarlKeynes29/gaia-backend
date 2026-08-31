import { faker } from '@faker-js/faker';

export interface Game {
	id: string;
	title: string;
	description: string;
	genre: string;
	image: string;
	price: number;
	is_available: boolean;
	is_featured: boolean;
}

const GENRES = ['Action', 'RPG', 'Strategy', 'Cyberpunk', 'Sci-Fi', 'Horror', 'Adventure'];
const MERCH_CATEGORIES = ['Apparel', 'Collectibles', 'Posters', 'Hardware', 'Accessories'];

export const generateFakeGames = (count: number = 10) => {
	return Array.from({ length: count }, () => {
		id: faker.string.uuid(),
	    title: `${faker.word.adjective()} ${faker.word.noun()}: ${faker.company.buzzNoun()}`,
	    description: faker.lorem.paragraph(),
		genre: faker.helpers.arrayElement(GENRES),
		image: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/600/400`,
	    price: parseFloat(faker.commerce.price({ min: 19, max: 69, dec: 2 })),
		is_available: faker.datatype.boolean(0.60),
	    is_featured: faker.datatype.boolean(0.3) // ~30% chance of being featured
	})
}

export interface MerchItem {
	id: string;
	title: string;
	description: string;
	source: string;
	image: string;
	price: number;
	is_available: boolean;
	is_featured: boolean;
	stock_quantity: number
}

export const generateFakeMerch = (count: number = 10): MerchItem[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
	title: `${faker.word.adjective()} ${faker.commerce.productName()}`,
	description: faker.commerce.productDescription(),
	source: faker.company.name(),
	image: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/600/400`,
	
    category: faker.helpers.arrayElement(MERCH_CATEGORIES),
    price: parseFloat(faker.commerce.price({ min: 15, max: 120, dec: 2 })),
    is_featured: faker.datatype.boolean(0.2),
    stock_quantity: faker.number.int({ min: 5, max: 100 })
  }));
};