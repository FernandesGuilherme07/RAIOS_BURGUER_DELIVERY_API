import express from 'express';
import { AditionalController } from '../controllers/AditionalController';

const aditionalRouter = express.Router();
const aditionalController = new AditionalController();

aditionalRouter.get('/', aditionalController.getAllAditionals.bind(aditionalController));
aditionalRouter.get('/:id', aditionalController.getAditionalById.bind(aditionalController));
aditionalRouter.post('/', aditionalController.createAditional.bind(aditionalController));
aditionalRouter.put('/', aditionalController.updateAditional.bind(aditionalController));
aditionalRouter.delete('/:id', aditionalController.deleteAditional.bind(aditionalController));

export default aditionalRouter;
