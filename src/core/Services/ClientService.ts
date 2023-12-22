import { CreateAddressInputModel } from "../Contracts/inputModel/CreateAddressInputModel";
import { CreateClientInputModel } from "../Contracts/inputModel/CreateClientInputModel";
import { UpdateClientDataInputModel } from "../Contracts/inputModel/UpdateClientDataInputModel";
import { IEncryptPassword } from "../Contracts/Utils/IEncryptPassword";
import { IClientRepository } from "../Contracts/repository/IClientRepository";
import { ApplicationViewModel } from "../Contracts/viewModel/ApplicationViewModel";
import { ClientViewModel } from "../Contracts/viewModel/ClientViewModel";


export class ClientService {
  constructor(
    private clientRepository: IClientRepository,
    private encryptPassword: IEncryptPassword
    ) {}

  async getAllClients(): Promise<ApplicationViewModel<ClientViewModel[]>> {
    const data = await this.clientRepository.GetAllClients();
    return new ApplicationViewModel({ errors: null, message: "success", data });
  }

  async getClientById(clientId: string): Promise<ApplicationViewModel<ClientViewModel | null>> {
    if (!clientId) {
      return new ApplicationViewModel({ errors: ["Id do usuário é requerido"], message: "error", data: null });
    }

    const client = await this.clientRepository.GetClientById(clientId);
    return new ApplicationViewModel({ errors: null, message: "success", data: client });
  }

  async createClient(data: CreateClientInputModel): Promise<ApplicationViewModel> {
    if (!data.ToEntity().IsValid()) {
      return new ApplicationViewModel({ errors: data.ToEntity().notifications, message: "error", data: null });
    }

    const emailExists = await this.clientRepository.GetClientByEmail(data.email);

    if(emailExists) {
        return new ApplicationViewModel({ errors: ["Email já cadastrado."], message: "error", data: null });
    }

    const passwordEncrypted = await this.encryptPassword.Encrypt(data.password)

    await this.clientRepository.CreateClient({...data, password: passwordEncrypted} as CreateClientInputModel);
    return new ApplicationViewModel({ errors: null, message: "success", data });
  }

  async updateClient(clientData: UpdateClientDataInputModel): Promise<ApplicationViewModel> {
    if (!clientData.ToEntity().IsValid()) {
      return new ApplicationViewModel({ errors: clientData.ToEntity().notifications, message: "error", data: null });
    }

    const clientExists = await this.clientRepository.GetClientById(clientData.id);
    if (!clientExists) {
      return new ApplicationViewModel({ errors: ["Usuário não encontrado"], message: "error", data: null });
    }

    const emailExists = await this.clientRepository.GetClientByEmail(clientData.email);

    if(!!emailExists) {
        return new ApplicationViewModel({ errors: ["Email já cadastrado."], message: "error", data: null });
    }

    const passwordEncrypted = await this.encryptPassword.Encrypt(clientData.password)

    await this.clientRepository.UpdateClientData({...clientData, password: passwordEncrypted} as UpdateClientDataInputModel);
    return new ApplicationViewModel({ errors: null, message: "success", data: "Usuário alterado com sucesso" });
  }

  async addAddressToClient(addressData: CreateAddressInputModel): Promise<ApplicationViewModel> {
    if (!addressData.ToEntity().IsValid()) {
      return new ApplicationViewModel({ errors: addressData.ToEntity().notifications, message: "error", data: null });
    }

    const clientExists = this.clientRepository.GetClientById(addressData.clientId);
    if (!clientExists) {
      return new ApplicationViewModel({ errors: ["Usuário não encontrado"], message: "error", data: null });
    }


    await this.clientRepository.AddAddressIntoClient(addressData);
    return new ApplicationViewModel({ errors: null, message: "success", data: "Endereço adicionado com sucesso" });
  }

  async removeAddressFromClient(clientId: string, addressId: string): Promise<ApplicationViewModel> {
    const clientExists = this.clientRepository.GetClientById(clientId);
    if (!clientExists) {
      return new ApplicationViewModel({ errors: ["Usuário não encontrado"], message: "error", data: null });
    }

    await this.clientRepository.RemoveAddressIntoClient(clientId, addressId);
    return new ApplicationViewModel({ errors: null, message: "success", data: "Endereço removido com sucesso" });
  }
}
            