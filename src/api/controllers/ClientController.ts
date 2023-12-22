import { Request, Response } from "express";
import { ClientServiceContainer } from "../Container";
import { CreateClientInputModel } from "../../core/Contracts/inputModel/CreateClientInputModel";
import { UpdateClientDataInputModel } from "../../core/Contracts/inputModel/UpdateClientDataInputModel";
import { CreateAddressInputModel } from "../../core/Contracts/inputModel/CreateAddressInputModel";


interface IClientData {
  name: string;
  email: string;
  password: string;
}

export class ClientController {
  private clientService = ClientServiceContainer;


  async getAllClients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getClientById(req: Request, res: Response): Promise<void> {
    try {
      const clientId = req.params.id;
      const client = await this.clientService.getClientById(clientId);
      if (client.message === "error") {
        res.status(400).json(client);
      } else {
        res.status(200).json(client);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createClient(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: IClientData = req.body;
      const createClientInputModel = new CreateClientInputModel(name, email, password);

      const response = await this.clientService.createClient(createClientInputModel);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(201).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const clientData = req.body;

      const response = await this.clientService.updateClient(clientData as UpdateClientDataInputModel);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addAddressToClient(req: Request, res: Response): Promise<void> {
    try {
      const addressData = req.body;

      const response = await this.clientService.addAddressToClient(addressData as CreateAddressInputModel);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeAddressFromClient(req: Request, res: Response): Promise<void> {
    try {
      const clientId = req.params.clientId;
      const addressId = req.params.addressId;

      const response = await this.clientService.removeAddressFromClient(clientId, addressId);

      if (response.message === "error") {
        res.status(400).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
