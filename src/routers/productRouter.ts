import { Router } from 'express';
import * as productController from '../controllers/productController';
import { verify, isAdmin } from '../controllers/authController'

const router = Router();

// router.get('/', productController.filteredSearch);
router.get('/', productController.getAllProducts);
router.post('/add', verify, isAdmin, productController.addProduct);
router.patch('/:id', verify, isAdmin, productController.editProduct);
router.delete('/:id', verify, isAdmin, productController.deleteProduct);

export default router;
