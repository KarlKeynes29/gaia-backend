import { Request, Response } from 'express';
import { Game } from '../src/models/Game.ts';
import { GameInterface, GameResponseInterface } from '../src/interface/GameInterface.ts';

export const addGame = async (req: Request<{}, {}, GameInterface>, res: Response<GameResponseInterface>) => {
    const { title, description, price, is_available, is_featured } = req.body;

    try {
         const game = await Game.create({
            title: title,
            description: description,
            price: price,
            is_available: is_available,
            is_featured: is_featured
        });

        console.log(game.toJSON());

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

export const editGame = async (req: Request<{ id: string }, {}, Partial<GameInterface>>, res: Response) => {
    const { title, description, price, is_available, is_featured } = req.body;
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

        game.destroy();
        return res.status(200).json({ message: 'Successfully deleted the game!' });
    } catch (error) {
        console.error("Error in deleting game...", error);
        return res.status(500).json({ message: 'Server error' });
    }
}