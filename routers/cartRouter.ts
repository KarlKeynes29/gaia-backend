import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { verify } from '../controllers/authController';

const router = Router();

router.get('/:id', verify, cartController.getCart);
router.patch('/remove/:id', verify, cartController.removeFromCart);
router.delete('/clear', verify, cartController.clearCart);
