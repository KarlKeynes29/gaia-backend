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
        console.error('Error in finding cart:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

export const removeFromCart = async (req: Request, res: Response) => {
    const { cartItemId } = req.params;
    const userId = req.user?.id;
    try {
        const item = await CartItem.findOne({
            where: { id: cartItemId },
            include: [{
                model: Cart,
                where: { user_id: userId }
            }]
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found in our cart.' });
        }

        await item.destroy();

        return res.status(200).json({ message: 'Item removed' });
    } catch (error) {
        return res.status(500).json({ message: 'Error in removing item' });
    }
}

export const clearCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const cart = Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Error in clearing  cart.' });
        }

        await Cart.destroy({ where: { userId }})
    } catch (error) {

    }

}
