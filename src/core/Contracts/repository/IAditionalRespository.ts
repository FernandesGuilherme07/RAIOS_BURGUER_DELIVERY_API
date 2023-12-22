import { CreateAditionalInputModel } from "../inputModel/CreateAditionalInputModel";
import { UpdateAditionalInputModel } from "../inputModel/UpdateAditionalInputModel";
import { AditionalViewModel } from "../viewModel/AditionalViewModel";

export interface IAditionalRepository {
    CreateAditional(data: CreateAditionalInputModel): Promise<void>;
    GetAditionalByName(name: string): Promise<AditionalViewModel | null>;
    GetAditionalById(id: string): Promise<AditionalViewModel | null>;
    GetAllAditionals(): Promise<AditionalViewModel[]>;
    UpdateAditional(data: UpdateAditionalInputModel): Promise<void>;
    DeleteAditional(id: string): Promise<void>;
}