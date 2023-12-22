import { CreateCategoryInputModel } from "../inputModel/CreateCategoryInputModel";
import { CategoryViewModel } from "../viewModel/CategoryViewModel";

export interface ICategoryRepository {
    CreateCategory(data: CreateCategoryInputModel): Promise<void>;
    GetCategoryByName(name: string): Promise<CategoryViewModel | null>;
    GetCategoryById(id: string): Promise<CategoryViewModel | null>;
    GetAllCategories(): Promise<CategoryViewModel[]>;
    DeleteCategory(id: string): Promise<void>;
}