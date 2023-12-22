import { CreateAditionalInputModel } from "../../../core/Contracts/inputModel/CreateAditionalInputModel";
import { UpdateAditionalInputModel } from "../../../core/Contracts/inputModel/UpdateAditionalInputModel";
import { IAditionalRepository } from "../../../core/Contracts/repository/IAditionalRespository";
import { AditionalViewModel } from "../../../core/Contracts/viewModel/AditionalViewModel";
import { AdionalMongooseModel, AditionalModel } from "../../models/AditionalModel";


export class AditionalRepositoryMongoose implements IAditionalRepository {
  async CreateAditional(data: CreateAditionalInputModel): Promise<void> {
    await AdionalMongooseModel.create(data);
  }

  async GetAditionalByName(name: string): Promise<AditionalViewModel | null> {
    const aditional = await AdionalMongooseModel.findOne({ name });
    return aditional ? this.mapModelToViewModel(aditional) : null;
  }

  async GetAditionalById(id: string): Promise<AditionalViewModel | null> {
    const aditional = await AdionalMongooseModel.findById(id);
    return aditional ? this.mapModelToViewModel(aditional) : null;
  }

  async GetAllAditionals(): Promise<AditionalViewModel[]> {
    const aditionals = await AdionalMongooseModel.find();
    return aditionals.map((aditional) => this.mapModelToViewModel(aditional));
  }

  async UpdateAditional(data: UpdateAditionalInputModel): Promise<void> {
    await AdionalMongooseModel.findByIdAndUpdate(data.id, { $set: data });
  }

  async DeleteAditional(id: string): Promise<void> {
    await AdionalMongooseModel.findByIdAndDelete(id);
  }

  private mapModelToViewModel(model: AditionalModel): AditionalViewModel {
    return {
      _id: model._id,
      name: model.name,
      description: model.description,
      price: model.price,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}
