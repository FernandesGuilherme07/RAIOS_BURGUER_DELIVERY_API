import express from 'express';
import { AuthController } from '../controllers/AuthController';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/', authController.Login.bind(authController));

export default authRouter;