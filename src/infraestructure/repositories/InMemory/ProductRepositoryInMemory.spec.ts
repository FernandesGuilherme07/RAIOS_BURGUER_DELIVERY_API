import { CreateProductInputModel } from '../../../core/Contracts/inputModel/CreateProductInputModel';
import { UpdateProductInputModel } from '../../../core/Contracts/inputModel/UpdateProductInputModel';
import { ProductRepositoryInMemory } from './ProductRepositoryInMemory';

describe('ProductRepositoryInMemory', () => {
  let productRepository: ProductRepositoryInMemory;

  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
  });

  it('should create a product', async () => {
    const createProductInput = new CreateProductInputModel(
      'Test Product',
      'Description',
      9.99,
      'TestCategory',
      'test-image.jpg'
    );

    await productRepository.CreateProduct(createProductInput);

    const createdProduct = await productRepository.GetProductByName('Test Product');

    expect(createdProduct).toBeDefined();
    expect(createdProduct!.name).toBe('Test Product');
  });

  it('should update a product', async () => {
    const createProductInput = new CreateProductInputModel(
      'Test Product',
      'Description',
      9.99,
      'TestCategory',
      'test-image.jpg'
    );

    await productRepository.CreateProduct(createProductInput);

    const createdProduct = await productRepository.GetProductByName('Test Product');

    expect(createdProduct).toBeDefined();

    const updateProductInput = new UpdateProductInputModel(
      createdProduct!._id,
      'Updated Product',
      'Updated Description',
      19.99,
      'UpdatedCategory',
      'updated-image.jpg'
    );

    await productRepository.UpdateProduct(updateProductInput);

    const updatedProduct = await productRepository.GetProductByName('Updated Product');

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct!.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const createProductInput = new CreateProductInputModel(
      'Test Product',
      'Description',
      9.99,
      'TestCategory',
      'test-image.jpg'
    );

    await productRepository.CreateProduct(createProductInput);

    const createdProduct = await productRepository.GetProductByName('Test Product');

    expect(createdProduct).toBeDefined();

    await productRepository.DeleteProduct(createdProduct!._id);

    const deletedProduct = await productRepository.GetProductByName('Test Product');

    expect(deletedProduct).toBeNull();
  });
});
