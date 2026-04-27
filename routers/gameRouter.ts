import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import { verify } from '../controllers/authController'

const router = Router();

router.get('/', gameController.getAllGames);
router.post('/add', verify, gameController.addGame);
router.put('/:id', verify, gameController.editGameDetails);
router.delete('/:id', verify, gameController.deleteGame);

export default router;
