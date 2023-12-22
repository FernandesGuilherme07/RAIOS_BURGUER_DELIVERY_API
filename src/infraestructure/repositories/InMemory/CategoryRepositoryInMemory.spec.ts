
import { CreateCategoryInputModel } from '../../../core/Contracts/inputModel/CreateCategoryInputModel';
import { CategoryRepositoryInMemory } from './CategoryRepositoryInMemory';

describe('CategoryRepositoryInMemory', () => {
    let categoryRepository: CategoryRepositoryInMemory;

    beforeEach(() => {
        categoryRepository = new CategoryRepositoryInMemory();
    });

    it('should create a category', async () => {
        const categoryData: CreateCategoryInputModel = { name: 'Test Category' };
        await categoryRepository.CreateCategory(categoryData);

        const categories = await categoryRepository.GetAllCategories();
        expect(categories.length).toBe(1);
        expect(categories[0].name).toBe('Test Category');
    });

    it('should get category by name', async () => {
        const categoryData: CreateCategoryInputModel = { name: 'Test Category' };
        await categoryRepository.CreateCategory(categoryData);

        const category = await categoryRepository.GetCategoryByName('Test Category');
        expect(category).not.toBeNull();
        expect(category?.name).toBe('Test Category');
    });

    it('should return null when getting category by non-existent name', async () => {
        const category = await categoryRepository.GetCategoryByName('Non-Existent Category');
        expect(category).toBeNull();
    });

    it('should get category by id', async () => {
        const categoryData: CreateCategoryInputModel = { name: 'Test Category' };
        await categoryRepository.CreateCategory(categoryData);

        const categories = await categoryRepository.GetAllCategories();
        const categoryId = categories[0]._id;

        const category = await categoryRepository.GetCategoryById(categoryId);
        expect(category).not.toBeNull();
        expect(category?.name).toBe('Test Category');
    });

    it('should return null when getting category by non-existent id', async () => {
        const category = await categoryRepository.GetCategoryById('nonexistentid');
        expect(category).toBeNull();
    });

    it('should get all categories', async () => {
        const categoryData1: CreateCategoryInputModel = { name: 'Category 1' };
        const categoryData2: CreateCategoryInputModel = { name: 'Category 2' };
        await categoryRepository.CreateCategory(categoryData1);
        await categoryRepository.CreateCategory(categoryData2);

        const categories = await categoryRepository.GetAllCategories();
        expect(categories.length).toBe(2);
        expect(categories[0].name).toBe('Category 1');
        expect(categories[1].name).toBe('Category 2');
    });

    it('should delete category', async () => {
        const categoryData: CreateCategoryInputModel = { name: 'Test Category' };
        await categoryRepository.CreateCategory(categoryData);

        const categoriesBeforeDelete = await categoryRepository.GetAllCategories();
        const categoryId = categoriesBeforeDelete[0]._id;

        await categoryRepository.DeleteCategory(categoryId);

        const categoriesAfterDelete = await categoryRepository.GetAllCategories();
        expect(categoriesAfterDelete.length).toBe(0);
    });

    it('should not throw error when deleting non-existent category', async () => {
        await expect(categoryRepository.DeleteCategory('nonexistentid')).resolves.not.toThrow();
    });
});

  