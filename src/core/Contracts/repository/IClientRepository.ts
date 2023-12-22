import { CreateAddressInputModel } from "../inputModel/CreateAddressInputModel";
import { CreateClientInputModel } from "../inputModel/CreateClientInputModel";
import { UpdateClientDataInputModel } from "../inputModel/UpdateClientDataInputModel";
import { ClientViewModel } from "../viewModel/ClientViewModel";

export interface IClientRepository {
    CreateClient(data: CreateClientInputModel): Promise<void>;
    GetAllClients(): Promise<ClientViewModel[]>;
    GetClientById(id: string): Promise<ClientViewModel | null>;
    GetClientByEmail(email: string): Promise<ClientViewModel | null>;
    AddAddressIntoClient(address: CreateAddressInputModel): Promise<void>;
    RemoveAddressIntoClient(clientId: string, addressId: string): Promise<void>;
    UpdateClientData(data: UpdateClientDataInputModel): Promise<void>;
}