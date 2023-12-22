import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { MongooseClientRepository } from '../../infraestructure/repositories/Mongoose/ClientRepositoryMongoose';
import { ApplicationViewModel } from '../../core/Contracts/viewModel/ApplicationViewModel';
import { ITokenPayload } from '../../core/Contracts/Utils/IAuthenticate';


export async function ensureAuthenticated (request: any, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json(new ApplicationViewModel({errors: ['Token é requerido.'], message: 'error', data: null}));
    }

    const [, token] = authHeader.split(' ');

    try {
        const { id: client_id } = verify(token, 'ce439be833f152d645c9f18d7a9030a7') as ITokenPayload;

        const clientsRepository = new MongooseClientRepository();
        const client = await clientsRepository.GetClientById(client_id);

        if(!client) {
            return response.status(401).json(new ApplicationViewModel({errors: ['Token inválido.'], message: 'error', data: null}));
        }

        request.client = {
            id: client_id
        }
        next();
    } catch (err) {
        return response.status(401).json(new ApplicationViewModel({errors: ['Token inválido.'], message: 'error', data: null}));
    }
}