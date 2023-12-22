import express from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get('/', productController.getAllProducts.bind(productController));
productRouter.get('/:id', productController.getProductById.bind(productController));
productRouter.post('/', productController.createProduct.bind(productController));
productRouter.put('/', productController.updateProduct.bind(productController));
productRouter.delete('/:id', productController.deleteProduct.bind(productController));

export default productRouter;
