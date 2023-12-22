import { CategoryService } from "./CategoryService";
import { CategoryRepositoryInMemory } from "../../infraestructure/repositories/InMemory/CategoryRepositoryInMemory";

describe("CategoryService", () => {
  let categoryService: CategoryService;
  let mockCategoryRepository: CategoryRepositoryInMemory;

  beforeEach(() => {
    mockCategoryRepository = new CategoryRepositoryInMemory();
    categoryService = new CategoryService(mockCategoryRepository);
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const result = await categoryService.getAllCategories();
      expect(result.message).toBe("success");
      expect(result.data).toHaveLength(0);
    });
  });

  describe("getCategoryById", () => {
    it("should return an error if categoryId is not provided", async () => {
      const result = await categoryService.getCategoryById("");
      expect(result.message).toBe("error");
      expect(result.errors).toContain("Id da categoria é requerido");
    });

    it("should return an error if category with given id does not exist", async () => {
      const result = await categoryService.getCategoryById("nonexistentid");
      expect(result.message).toBe("error");
      expect(result.errors).toContain("Não existem categorias com este id.");
    });
  });

  describe("createCategory", () => {
    it("should create a new category", async () => {
      const result = await categoryService.createCategory({ name: "TestCategory" });

      expect(result.message).toBe("success");
      expect(result.data.name).toBe("TestCategory");
    });

    it("should return an error if category name already exists", async () => {
      await categoryService.createCategory({ name: "TestCategory" });

      const result = await categoryService.createCategory({ name: "TestCategory" });

      expect(result.message).toBe("error");
      expect(result.errors).toContain("Já existe categoria cadastrada com este nome.");
    });
  });

  describe("deleteCategory", () => {
    it("should delete an existing category", async () => {
      await categoryService.createCategory({ name: "TestCategory" });

      const result = await categoryService.deleteCategory("1");

      expect(result.message).toBe("success");
      expect(result.data).toBe("Categoria deletada com sucesso");

      const deletedCategory = await categoryService.getCategoryById("1");
      expect(deletedCategory.data).toBeNull();
    });

    it("should return an error if the category to delete does not exist", async () => {
      const result = await categoryService.deleteCategory("nonexistentid");

      expect(result.message).toBe("error");
      expect(result.errors).toContain("Não existem categorias com este id.");
    });
  });
});
