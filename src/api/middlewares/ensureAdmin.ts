import { NextFunction, Request, Response } from "express";
import { MongooseClientRepository } from "../../infraestructure/repositories/Mongoose/ClientRepositoryMongoose";
import { ApplicationViewModel } from "../../core/Contracts/viewModel/ApplicationViewModel";


export async function ensureAdmin(
  request: any,
  response: Response,
  next: NextFunction
) {
  const { id } = request.client;

  const clientsRepository = new MongooseClientRepository();
  const client = await clientsRepository.GetClientById(id);

  if (client?.rule === "client") {
    return response.status(401).json(new ApplicationViewModel({errors: ['Usuário não é admin.'], message: 'error', data: null}));
  }

  return next();
}