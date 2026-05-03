import { Router } from 'express';
import * as userController from '../controllers/userController';
import { verify } from '../controllers/authController';

const router = Router();

router.get('/:id', verify, userController.getUserDetails);
router.patch('/:id/password', verify, userController.changePassword);
router.patch('/:id', verify, userController.updateUserDetails);
router.delete('/:id', verify, userController.deleteUser);
