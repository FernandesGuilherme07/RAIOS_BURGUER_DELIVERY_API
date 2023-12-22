import express from 'express';
import { ProductAditionalsController } from '../controllers/ProductAditionalsController';

const productAditionalsRouter = express.Router();
const productAditionalsController = new ProductAditionalsController();

productAditionalsRouter.get('/', productAditionalsController.getAllProductsWithAditionals.bind(productAditionalsController));
productAditionalsRouter.get('/:id', productAditionalsController.getProductWithAditionalsByProductId.bind(productAditionalsController));
productAditionalsRouter.post('/', productAditionalsController.createProductAditionals.bind(productAditionalsController));
productAditionalsRouter.put('/', productAditionalsController.addAditionalsIntoProductAditionalsByProductId.bind(productAditionalsController));
productAditionalsRouter.patch('/', productAditionalsController.removeProductAditionalsByProductId.bind(productAditionalsController));
productAditionalsRouter.delete('/:id', productAditionalsController.deleteProductAditionalsByProductId.bind(productAditionalsController));

export default productAditionalsRouter;
