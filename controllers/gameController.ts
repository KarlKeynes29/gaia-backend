import { Op } from 'sequelize';s
import { Request, Response } from 'express';
import { Game } from '../src/models/Game.ts';
import { GameInterface, filterGameInterface, GameResponseInterface } from '../src/interface/GameInterface.ts';

// Not needed anymore but I'll be commenting this out for reference.
// Made a types.d.ts file to declare the Request model to include an extra user object.
// Notes for study: We extend the base Request model from Express to make a custom interface with Auth/middleware object inside added to the body sent from the frontend.
// interface AuthRequest extends Request<{ id: string }, {}, GameInterface> {
//     user: {
//         id: string;
//         role: string;
//     };
// }

export const getAllGames = async (req: Request, res: Response) => {
    try {
        const games = await Game.findAll();

        if (games.length === 0) {
            return res.status(404).json({ message: 'No games found...' });
        }

        res.status(200).json({
            message: 'Successfully fetched all games!',
            games: games
        });
    } catch (error) {
        console.error('Error in fetching all games!', error);
        res.status(404).json({ message: 'Internal server error while fetching.' });
    }
}

export const filterGame = async (req: Request<{}, {}, filterGameInterface>, res: Response) => {
    const { genre, is_featured, is_available, priceFrom, priceTo } = req.query;
    const whereClause: any = {};
    try {

    } catch (error) {
        console.error('Error while filtering!', error);
        res.status(500).json('Interal server error while filtering.');
    }

    if (genre) whereClause.genre = genre;
    if (is_featured !== undefined) whereClause.is_featured = is_featured === 'true';
    if (is_available !== undefined) whereClause.is_available = is_available === 'true';
    if (priceFrom || priceTo) {
        whereClause.price = {};
        if (priceFrom) whereClause.price[Op.gte] = Number(priceFrom);
        if (priceTo) whereClause.price[Op.lte] = Number(priceTo);
    }

    const games = await Game.findAll({
       where: whereClause
    });

    if (games.length === 0) {
        return res.status(404).json({ message: 'No games found.' });
    }
    
    // simplified
    // try {
    //     const games = await Game.findAll({
    //         where: genre ? { genre } : {}
    //     });

    //     if (!games) {
    //         res.status(404).json({ message: 'Game not found.' });
    //     }

    //     return res.status(200).json({ messsage: `Successfully filtered by genre: ${genre}` });
    // } catch (error) {
    //     console.error("Error in filtering by genre!", error);
    //     res.status(500).json({ message: 'Internal server error while filtering.' });
    // }
}

export const addGame = async (req: Request<{}, {}, GameInterface>, res: Response<GameResponseInterface>) => {
    const { title, description, price, genre, image, is_available, is_featured } = req.body;

    try {
         const game = await Game.create({
            title: title,
            description: description,
            price: price,
            genre: genre,
            image: image,
            is_available: is_available,
            is_featured: is_featured
        });

        // console.log(game.toJSON());

        return res.status(201).json({
            message: 'Game was added successfully!',
            title: game.title,
            price: game.price
        });
    } catch (error) {
        console.error('Error in adding the game!', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const editGameDetails = async (req: Request<{ id: string }, {}, GameInterface>, res: Response) => {
    // const authReq = req as AuthRequest;
    const { title, description, price, genre, image, is_available, is_featured } = req.body;
    const { id } = req.params;

    try{
        const game = await Game.findByPk(id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found!' });
        }

        await game.update({
                title: title ?? game.title,
                description: description ?? game.description,
                price: price ?? game.price,
                genre: genre ?? game.genre,
                image: image ?? game.image,
                is_available: is_available ?? game.is_available,
                is_featured: is_featured ?? game.is_featured
            });
        res.status(200).json({ message: 'Game succesfully updated!' });
    } catch (error) {
        console.error("Error in updated game details!", error);
        return res.status(500).json({ message: 'Server error' });
    }
}
// soft-delete hehe
export const deleteGame = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
        const game = await Game.findByPk(id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found!' });
        }
        // Note for study: since paranoid is set to true in the model, this will just soft-delete the entry!! :D
        game.destroy();

        return res.status(200).json({ message: 'Successfully deleted the game!' });
    } catch (error) {
        console.error("Error in deleting game...", error);
        return res.status(500).json({ message: 'Server error' });
    }
}
