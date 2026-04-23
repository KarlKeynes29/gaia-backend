import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import { verify } from '../controllers/authController'

const router = Router();

router.get('/', gameController.getAllGames);
router.put('/:id', verify, gameController.editGameDetails);
export default router;
