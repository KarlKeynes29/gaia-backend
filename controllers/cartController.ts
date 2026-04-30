import { Request, Response } from 'express';
import { Cart } from '../src/models/Cart';
import { CartItem } from '../src/models/CartItem';

export const getCart = async (req: Request, res: Response) => {
    try {

        const userId = req.user!.id
        const cart = await Cart.findOne({
            where: { userId: userId }
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const clearCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const cart = Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Error in clearing  cart.' });
        }

        await CartItem.destroy({ where: { cartId: cart.id }})
    } catch (error) {

    }

}
