import { Router } from 'express';
import * as userController from '../controllers/userController';
import { verify } from '../controllers/authController';

const router = Router();
router.post('/forgot-password', userController.verifyPassword);
router.patch('/reset-password', userController.resetPassword);
router.get('/:id', verify, userController.getUserDetails);
router.patch('/:id', verify, userController.updateUserDetails);
router.delete('/:id', verify, userController.deleteUser);

export default router
