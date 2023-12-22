import { CreateAditionalInputModel } from "../Contracts/inputModel/CreateAditionalInputModel";
import { UpdateAditionalInputModel } from "../Contracts/inputModel/UpdateAditionalInputModel";
import { IAditionalRepository } from "../Contracts/repository/IAditionalRespository";
import { AditionalViewModel } from "../Contracts/viewModel/AditionalViewModel";
import { ApplicationViewModel } from "../Contracts/viewModel/ApplicationViewModel";

export class AditionalService {
  constructor(private aditionalRepository: IAditionalRepository) {}

  async getAllAditionals(): Promise<ApplicationViewModel<AditionalViewModel[]>> {
    const data = await this.aditionalRepository.GetAllAditionals();

    const applicationViewModel = new ApplicationViewModel({ errors: null, message: "success", data });

    return applicationViewModel;
  }

  async getAditionalById(aditionalId: string): Promise<ApplicationViewModel<AditionalViewModel | null>> {
    if (!aditionalId) {
      return new ApplicationViewModel({ errors: ["Id do adicional é requerido"], message: "error", data: null });
    }

    const aditional = await this.aditionalRepository.GetAditionalById(aditionalId);

    if (!aditional) {
      return new ApplicationViewModel({ errors: ["Não existem adicionais com este id."], message: "error", data: null });
    }

    return new ApplicationViewModel({ errors: null, message: "success", data: aditional });
  }

  async createAditional(data: CreateAditionalInputModel): Promise<ApplicationViewModel> {

    const aditional = new CreateAditionalInputModel(data.name, data.description, data.price).ToEntity();

    if (!aditional.IsValid()) {
      return new ApplicationViewModel({ errors: aditional.notifications, message: "error", data: null });
    }

    const aditionalNameExists = await this.aditionalRepository.GetAditionalByName(data.name);

    if (aditionalNameExists) {
      return new ApplicationViewModel({ errors: ["Já existe adicional cadastrado com este nome."], message: "error", data: null });
    }

    await this.aditionalRepository.CreateAditional(data);

    return new ApplicationViewModel({ errors: null, message: "success", data: aditional });
  }

  async updateAditional(data: UpdateAditionalInputModel): Promise<ApplicationViewModel> {
    const aditional = new UpdateAditionalInputModel(data.id, data.name, data.description, data.price).ToEntity();

    if (!aditional.IsValid()) {
      return new ApplicationViewModel({ errors: aditional.notifications, message: "error", data: null });
    }

    const aditionalExists = await this.aditionalRepository.GetAditionalById(data.id);

    if (!aditionalExists) {
      return new ApplicationViewModel({ errors: ["Não existem adicionais com este id."], message: "error", data: null });
    }

    const aditionalNameExists = await this.aditionalRepository.GetAditionalByName(data.name);

    if (aditionalNameExists) {
      return new ApplicationViewModel({ errors: ["Já existe adicional cadastrado com este nome."], message: "error", data: null });
    }

    await this.aditionalRepository.UpdateAditional(data);

    return new ApplicationViewModel({ errors: null, message: "success", data: "Adicional alterado com sucesso" });
  }

  async deleteAditional(aditionalId: string): Promise<ApplicationViewModel> {
    const aditionalExists = await this.aditionalRepository.GetAditionalById(aditionalId);

    if (!aditionalExists) {
      return new ApplicationViewModel({ errors: ["Não existem adicionais com este id."], message: "error", data: null });
    }

    await this.aditionalRepository.DeleteAditional(aditionalId);
    return new ApplicationViewModel({ errors: null, message: "success", data: "Adicional deletado com sucesso" });
  }
}
