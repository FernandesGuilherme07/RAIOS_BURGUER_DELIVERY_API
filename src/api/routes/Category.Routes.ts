import express from 'express';
import { CategoryController } from '../controllers/CategoryContoller';

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get('/', categoryController.getAllCategories.bind(categoryController));
categoryRouter.get('/:id', categoryController.getCategoryById.bind(categoryController));
categoryRouter.post('/', categoryController.createCategory.bind(categoryController));
categoryRouter.delete('/:id', categoryController.deleteCategory.bind(categoryController));

export default categoryRouter;