import { CreateCategoryInputModel } from "../Contracts/inputModel/CreateCategoryInputModel";
import { ICategoryRepository } from "../Contracts/repository/ICategoryRepository";
import { CategoryViewModel } from "../Contracts/viewModel/CategoryViewModel";
import { ApplicationViewModel } from "../Contracts/viewModel/ApplicationViewModel";

export class CategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async getAllCategories(): Promise<ApplicationViewModel<CategoryViewModel[]>> {
    const data = await this.categoryRepository.GetAllCategories();

    const applicationViewModel = new ApplicationViewModel({
      errors: null,
      message: "success",
      data,
    });

    return applicationViewModel;
  }

  async getCategoryById(categoryId: string): Promise<ApplicationViewModel<CategoryViewModel | null>> {
    if (!categoryId) {
      return new ApplicationViewModel({
        errors: ["Id da categoria é requerido"],
        message: "error",
        data: null,
      });
    }

    const category = await this.categoryRepository.GetCategoryById(categoryId);

    if (!category) {
      return new ApplicationViewModel({
        errors: ["Não existem categorias com este id."],
        message: "error",
        data: null,
      });
    }

    return new ApplicationViewModel({
      errors: null,
      message: "success",
      data: category,
    });
  }

  async createCategory(data: CreateCategoryInputModel): Promise<ApplicationViewModel> {
    const categoryNameExists = await this.categoryRepository.GetCategoryByName(data.name);

    if (categoryNameExists) {
      return new ApplicationViewModel({
        errors: ["Já existe categoria cadastrada com este nome."],
        message: "error",
        data: null,
      });
    }

    await this.categoryRepository.CreateCategory(data);

    return new ApplicationViewModel({
      errors: null,
      message: "success",
      data: { name: data.name }, // You can customize the data as needed
    });
  }

  async deleteCategory(categoryId: string): Promise<ApplicationViewModel> {
    const categoryExists = await this.categoryRepository.GetCategoryById(categoryId);

    if (!categoryExists) {
      return new ApplicationViewModel({
        errors: ["Não existem categorias com este id."],
        message: "error",
        data: null,
      });
    }

    await this.categoryRepository.DeleteCategory(categoryId);

    return new ApplicationViewModel({
      errors: null,
      message: "success",
      data: "Categoria deletada com sucesso",
    });
  }
}
