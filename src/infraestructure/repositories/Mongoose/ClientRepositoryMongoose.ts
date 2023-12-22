import { CreateAddressInputModel } from "../../../core/Contracts/inputModel/CreateAddressInputModel";
import { CreateClientInputModel } from "../../../core/Contracts/inputModel/CreateClientInputModel";
import { UpdateClientDataInputModel } from "../../../core/Contracts/inputModel/UpdateClientDataInputModel";
import { IClientRepository } from "../../../core/Contracts/repository/IClientRepository";
import { AddressViewModel } from "../../../core/Contracts/viewModel/AddressViewModel";
import { ClientViewModel } from "../../../core/Contracts/viewModel/ClientViewModel";
import { ClientModel } from "../../models/ClientModel";

export class MongooseClientRepository implements IClientRepository {
    async CreateClient(data: CreateClientInputModel): Promise<void> {
      await ClientModel.create(data);
    }
  
    async GetAllClients(): Promise<ClientViewModel[]> {
      const clients = await ClientModel.find().lean();
      return clients.map(this.mapToViewModel);
    }
  
    async GetClientById(id: string): Promise<ClientViewModel | null> {
      const client = await ClientModel.findById(id).lean();

      return client ? this.mapToViewModel(client) : null;
    }
  
    async GetClientByEmail(email: string): Promise<ClientViewModel | null> {
      const client = await ClientModel.findOne({ email }).lean();

      return client ? this.mapToViewModel(client) : null;
    }
  
    async AddAddressIntoClient(address: CreateAddressInputModel): Promise<void> {
      await ClientModel.findByIdAndUpdate(
        address.clientId,
        { $push: { addresses: address.ToEntity() } },
      );
    }
  
    async RemoveAddressIntoClient(clientId: string, addressId: string): Promise<void> {
      await ClientModel.findByIdAndUpdate(
        clientId,
        { $pull: { addresses: { _id: addressId } } },
      );
    }
  
    async UpdateClientData(data: UpdateClientDataInputModel): Promise<void> {
      await ClientModel.findByIdAndUpdate(data.id, data.ToEntity());
    }
  
    // Método privado para mapear dados do Mongoose para ViewModel
    private mapToViewModel(data: any): ClientViewModel {
        const { _id, name, email, password, rule, addresses, createdAt, updatedAt } = data;
        const mappedAddresses: AddressViewModel[] | undefined = addresses.map((address: any) => ({
          _id: address._id.toString(),
          zipCode: address.zipCode,
          street: address.street,
          number: address.number,
          complement: address.complement,
          city: address.city,
          state: address.state,
          country: address.country,
          createdAt: address.createdAt,
          updatedAt: address.updatedAt,
        }));
        return { _id: _id.toString(), name, rule, email, password, Addresses: mappedAddresses, createdAt, updatedAt };
    }
}