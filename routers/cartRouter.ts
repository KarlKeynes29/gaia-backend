import { Router } from 'express';
import * as cartController from '../controllers/gameController';
import { verify } from '../controllers/authController';

const router = Router();

router.get('/:id', verify, cartController.getAllGames);
