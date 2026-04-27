import { Router } from 'express';
import * as userController from '../controllers/userController';
import { verify } from '../controllers/authController';

const router = Router();

router.patch('/:id', verify, userController.updateUserDetails);