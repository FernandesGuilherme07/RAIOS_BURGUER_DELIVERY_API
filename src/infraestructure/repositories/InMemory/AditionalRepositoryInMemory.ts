import { CreateAditionalInputModel } from "../../../core/Contracts/inputModel/CreateAditionalInputModel";
import { UpdateAditionalInputModel } from "../../../core/Contracts/inputModel/UpdateAditionalInputModel";
import { IAditionalRepository } from "../../../core/Contracts/repository/IAditionalRespository";
import { AditionalViewModel } from "../../../core/Contracts/viewModel/AditionalViewModel";

export class AditionalRepositoryInMemory implements IAditionalRepository {
  private aditionals: AditionalViewModel[] = [];

  async CreateAditional(data: CreateAditionalInputModel): Promise<void> {
    const aditional: AditionalViewModel = {
      _id: (this.aditionals.length + 1).toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.aditionals.push(aditional);
  }

  async GetAditionalByName(name: string): Promise<AditionalViewModel | null> {
    return this.aditionals.find((a) => a.name === name) || null;
  }

  async GetAditionalById(id: string): Promise<AditionalViewModel | null> {
    return this.aditionals.find((a) => a._id === id) || null;
  }

  async GetAllAditionals(): Promise<AditionalViewModel[]> {
    return this.aditionals;
  }

  async UpdateAditional(data: UpdateAditionalInputModel): Promise<void> {
    const existingAditionalIndex = this.aditionals.findIndex((a) => a._id === data.id);

    if (existingAditionalIndex !== -1) {
      this.aditionals[existingAditionalIndex] = {
        ...this.aditionals[existingAditionalIndex],
        ...data,
        updatedAt: new Date(),
      };
    }
  }

  async DeleteAditional(id: string): Promise<void> {
    const aditionalIndex = this.aditionals.findIndex((a) => a._id === id);

    if (aditionalIndex !== -1) {
      this.aditionals.splice(aditionalIndex, 1);
    }
  }
}
