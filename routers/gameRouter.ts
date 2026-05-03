import { Router } from 'express';
import * as gameController from '../controllers/gameController';
import { verify, isAdmin } from '../controllers/authController'

const router = Router();

router.get('/', gameController.getAllGames);
router.post('/add', verify, isAdmin, gameController.addGame);
router.put('/:id', verify, isAdmin, gameController.editGameDetails);
router.delete('/:id', verify, isAdmin, gameController.deleteGame);

export default router;
