import express from 'express';
import { addProducts, deleteProduct, getProducts, updateProduct } from '../controler/product_control.js';


const router = express.Router();

router.get('/', getProducts);

router.post('/', addProducts);

router.delete("/:id", deleteProduct);
 
router.patch("/:id", updateProduct);




export default router;