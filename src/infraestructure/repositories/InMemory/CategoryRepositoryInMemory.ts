import { CreateCategoryInputModel } from "../../../core/Contracts/inputModel/CreateCategoryInputModel";
import { ICategoryRepository } from "../../../core/Contracts/repository/ICategoryRepository";
import { CategoryViewModel } from "../../../core/Contracts/viewModel/CategoryViewModel";

export interface CategoryModel {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  export class CategoryRepositoryInMemory implements ICategoryRepository {
    private categories: CategoryViewModel[] = [];
  
    async CreateCategory(data: CreateCategoryInputModel): Promise<void> {
      const category: CategoryViewModel = {
        _id: (this.categories.length + 1).toString(),
        name: data.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.categories.push(category);
    }
  
    async GetCategoryByName(name: string): Promise<CategoryViewModel | null> {
      return this.categories.find((c) => c.name === name) || null;
    }
  
    async GetCategoryById(id: string): Promise<CategoryViewModel | null> {
      return this.categories.find((c) => c._id === id) || null;
    }
  
    async GetAllCategories(): Promise<CategoryViewModel[]> {
      return this.categories;
    }
  
    async DeleteCategory(id: string): Promise<void> {
      const categoryIndex = this.categories.findIndex((c) => c._id === id);
  
      if (categoryIndex !== -1) {
        this.categories.splice(categoryIndex, 1);
      }
    }
  }
  