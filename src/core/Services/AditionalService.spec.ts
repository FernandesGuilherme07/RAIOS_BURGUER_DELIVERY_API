import { AditionalService } from './AditionalService';
import { CreateAditionalInputModel } from '../Contracts/inputModel/CreateAditionalInputModel';
import { UpdateAditionalInputModel } from '../Contracts/inputModel/UpdateAditionalInputModel';
import { AditionalRepositoryInMemory } from '../../infraestructure/repositories/InMemory/AditionalRepositoryInMemory';

describe('AditionalService', () => {
  let aditionalService: AditionalService;
  let aditionalRepository: AditionalRepositoryInMemory;

  beforeEach(() => {
    aditionalRepository = new AditionalRepositoryInMemory();
    aditionalService = new AditionalService(aditionalRepository);
  });

  test('getAllAditionals should return all aditionals', async () => {
    // Arrange
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test Description',
      price: 10.0,
    };
    await aditionalService.createAditional(aditionalData as CreateAditionalInputModel);

    // Act
    const result = await aditionalService.getAllAditionals();

    // Assert
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe(aditionalData.name);
  });

  test('getAditionalById should handle missing ID', async () => {
    // Act
    const result = await aditionalService.getAditionalById('');

    // Assert
    expect(result.errors).toContain('Id do adicional é requerido');
    expect(result.message).toBe('error');
    expect(result.data).toBeNull();
  });

  test('createAditional should handle invalid input model', async () => {
    // Arrange
    const aditionalData = {
      name: '',
      description: 'Test Description',
      price: 10.0,
    };

    // Act
    const result = await aditionalService.createAditional(aditionalData as CreateAditionalInputModel);

    // Assert
    expect(result.errors).toContain('Nome do adicional é requerido.');
    expect(result.message).toBe('error');
    expect(result.data).toBeNull();
  });

  test('createAditional should handle duplicate aditional name', async () => {
    // Arrange
    const aditionalData1 = {
      name: 'Duplicate Aditional',
      description: 'Test Description',
      price: 10.0,
    };
    await aditionalService.createAditional(aditionalData1 as CreateAditionalInputModel);

    const aditionalData2 = {
      name: 'Duplicate Aditional',
      description: 'Another Test Description',
      price: 15.0,
    };

    // Act
    const result = await aditionalService.createAditional(aditionalData2 as CreateAditionalInputModel);

    // Assert
    expect(result.errors).toContain('Já existe adicional cadastrado com este nome.');
    expect(result.message).toBe('error');
    expect(result.data).toBeNull();
  });

  test('updateAditional should handle non-existent aditional', async () => {
    // Arrange
    const updateData = {
      id: 'nonexistentId',
      name: 'Updated Aditional',
      description: 'Updated Test Description',
      price: 20.0,
    };

    // Act
    const result = await aditionalService.updateAditional(updateData as UpdateAditionalInputModel);

    // Assert
    expect(result.errors).toContain('Não existem adicionais com este id.');
    expect(result.message).toBe('error');
    expect(result.data).toBeNull();
  });

  test('updateAditional should handle invalid input model', async () => {
    // Arrange
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test Description',
      price: 10.0,
    };
    const createdAditional = await aditionalService.createAditional(aditionalData as CreateAditionalInputModel);

    const updateData = {
      id: createdAditional.data._id,
      name: '',
      description: 'Updated Test Description',
      price: 20.0,
    };

    // Act
    const result = await aditionalService.updateAditional(updateData as UpdateAditionalInputModel);

    // Assert
    expect(result.errors).toContain('Nome do adicional é requerido.');
    expect(result.message).toBe('error');
    expect(result.data).toBeNull();
  });

  test('deleteAditional should handle non-existent aditional', async () => {
    // Act
    const result = await aditionalService.deleteAditional('nonexistentId');

    // Assert
    expect(result.errors).toContain('Não existem adicionais com este id.');
    expect(result.message).toBe('error');
    expect(result.data).toBeNull();
  });
});
