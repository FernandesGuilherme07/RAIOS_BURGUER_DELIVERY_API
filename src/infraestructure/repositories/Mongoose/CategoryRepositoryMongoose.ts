import { CreateCategoryInputModel } from "../../../core/Contracts/inputModel/CreateCategoryInputModel";
import { ICategoryRepository } from "../../../core/Contracts/repository/ICategoryRepository";
import { CategoryViewModel } from "../../../core/Contracts/viewModel/CategoryViewModel";
import { CategoryModel, CategoryMongooseModel } from "../../models/CategoryModel";

export class MongooseCategoryRepository implements ICategoryRepository {
  async CreateCategory(data: CreateCategoryInputModel): Promise<void> {
    await CategoryMongooseModel.create(data);
  }

  async GetCategoryByName(name: string): Promise<CategoryViewModel | null> {
    const category: CategoryModel | null = await CategoryMongooseModel.findOne({ name }).lean();
    if (!category) {
     return null
    }
    return this.mapToViewModel(category);
  }

  async GetCategoryById(id: string): Promise<CategoryViewModel | null> {
    const category: CategoryModel | null = await CategoryMongooseModel.findById(id).lean();
    if (!category) {
        return null
    }
    return this.mapToViewModel(category);
  }

  async GetAllCategories(): Promise<CategoryViewModel[]> {
    const categories = await CategoryMongooseModel.find().lean();
    return categories.map((category) => this.mapToViewModel(category));
  }

  async DeleteCategory(id: string): Promise<void> {
    await CategoryMongooseModel.findByIdAndDelete(id);
  }

  private mapToViewModel(data: CategoryModel): CategoryViewModel {
    const { _id, name, createdAt, updatedAt } = data;
    return {
      _id,
      name,
      createdAt,
      updatedAt,
    };
  }
}
