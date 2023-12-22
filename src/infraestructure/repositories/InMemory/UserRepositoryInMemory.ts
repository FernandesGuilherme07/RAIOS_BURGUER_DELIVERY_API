import { CreateAddressInputModel } from "../../../core/Contracts/inputModel/CreateAddressInputModel";
import { CreateClientInputModel } from "../../../core/Contracts/inputModel/CreateClientInputModel";
import { UpdateClientDataInputModel } from "../../../core/Contracts/inputModel/UpdateClientDataInputModel";
import { IClientRepository } from "../../../core/Contracts/repository/IClientRepository";
import { AddressViewModel } from "../../../core/Contracts/viewModel/AddressViewModel";
import { ClientViewModel } from "../../../core/Contracts/viewModel/ClientViewModel";

export class ClientRepositoryInMemory implements IClientRepository {
    private clients: ClientViewModel[] = [];
  
    async CreateClient(data: CreateClientInputModel): Promise<void> {
      this.clients.push({ ...data.ToEntity(), _id: '123', createdAt: new Date(), updatedAt: new Date() } as ClientViewModel);
    }
  
    async GetAllClients(): Promise<ClientViewModel[]> {
      return this.clients;
    }
  
    async GetClientById(id: string): Promise<ClientViewModel | null> {
      return this.clients.find(client => client._id === id) || null;
    }
  
    async GetClientByEmail(email: string): Promise<ClientViewModel | null> {
      return this.clients.find(client => client.email === email) || null;
    }
  
    async AddAddressIntoClient(address: CreateAddressInputModel): Promise<void> {
      const client = this.clients.find(u => u._id === address.clientId);
      if (client) {
        if (!client.Addresses) {
          client.Addresses = [];
        }
        const newAddress = address.ToEntity();
        client.Addresses.push({
            ...newAddress,
            createdAt: new Date(),
            updatedAt: new Date(),
        }  as unknown as AddressViewModel);
      }
    }
  
    async RemoveAddressIntoClient(clientId: string, addressId: string): Promise<void> {
      const client = this.clients.find(u => u._id === clientId);
      if (client && client.Addresses) {
        client.Addresses = client.Addresses.filter(address => address._id !== addressId);
      }
    }
  
    async UpdateClientData(data: UpdateClientDataInputModel): Promise<void> {
      const client = this.clients.find(u => u._id === data.id);
      if (client) {
        client.name = data.name;
        client.email = data.email;
        client.rule = data.rule;
        client.password = data.password;
        client.updatedAt = new Date();
      }
    }
  }