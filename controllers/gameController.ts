import { Request, Response } from 'express';
import { Game } from '../src/models/Game.ts';
import { GameInterface, GameResponseInterface, editGameInterface } from '../src/interface/GameInterface.ts';

export const addGame = async (req: Request<{}, {}, GameInterface>, res: Response<GameResponseInterface>) => {
    const { title, description, price, is_available = true, is_featured = false } = req.body;

    const game = await Game.create({
        title: title,
        description: description,
        price: price,
        is_available: is_available,
        is_featured: is_featured
    });

    console.log(game.title);

    return res.status(200).json({
        message: 'Game was added successfully!',
        title: game.title,
        price: game.price
    });
}

export const editGame = async (req: Request<{}, {}, editGameInterface>, res: Response) => {
    const {title, description, price, id} = req.body;
    try{
        const game = await Game.findByPk(id);

        if (game) {
            game.title = title,
            game.description = description,
            game.price = price,

            await game.save();
        }
        res.status(200).json({ message: 'Game succesfully updated!' });
    } catch (error) {
        console.error("Error in updated game details!", error);
    }
}