import express from 'express';
import { ClientController } from '../controllers/ClientController';

const clientRouter = express.Router();
const clientController = new ClientController();

clientRouter.get('/', clientController.getAllClients.bind(clientController));
clientRouter.get('/:id', clientController.getClientById.bind(clientController));
clientRouter.post('/', clientController.createClient.bind(clientController));
clientRouter.put('/', clientController.updateClient.bind(clientController));
clientRouter.post('/address', clientController.addAddressToClient.bind(clientController));
clientRouter.delete('/:clientId/address/:addressId', clientController.removeAddressFromClient.bind(clientController));

export default clientRouter;
