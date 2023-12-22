import { CreateAditionalInputModel } from '../../../core/Contracts/inputModel/CreateAditionalInputModel';
import { UpdateAditionalInputModel } from '../../../core/Contracts/inputModel/UpdateAditionalInputModel';
import { AditionalRepositoryInMemory } from './AditionalRepositoryInMemory';

describe('AditionalRepositoryInMemory', () => {
  let aditionalRepository: AditionalRepositoryInMemory;

  beforeEach(() => {
    aditionalRepository = new AditionalRepositoryInMemory();
  });

  it('should create a new aditional', async () => {
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test description',
      price: 10,
    };

    await aditionalRepository.CreateAditional(aditionalData as CreateAditionalInputModel);

    const aditionals = await aditionalRepository.GetAllAditionals();

    expect(aditionals.length).toBe(1);
    expect(aditionals[0].name).toBe('Test Aditional');
  });

  it('should get an aditional by name', async () => {
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test description',
      price: 10,
    };

    await aditionalRepository.CreateAditional(aditionalData as CreateAditionalInputModel);

    const fetchedAditional = await aditionalRepository.GetAditionalByName('Test Aditional');

    expect(fetchedAditional).toBeDefined();
    expect(fetchedAditional!.name).toBe('Test Aditional');
  });

  it('should return null when getting an aditional by non-existing name', async () => {
    const fetchedAditional = await aditionalRepository.GetAditionalByName('Non-Existing Aditional');

    expect(fetchedAditional).toBeNull();
  });

  it('should get an aditional by id', async () => {
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test description',
      price: 10,
    };

    await aditionalRepository.CreateAditional(aditionalData as CreateAditionalInputModel);
    const [aditional] = await aditionalRepository.GetAllAditionals();
    const fetchedAditional = await aditionalRepository.GetAditionalById(aditional._id);

    expect(fetchedAditional).toBeDefined();
    expect(fetchedAditional!.name).toBe('Test Aditional');
  });

  it('should return null when getting an aditional by non-existing id', async () => {
    const fetchedAditional = await aditionalRepository.GetAditionalById('non-existing-id');

    expect(fetchedAditional).toBeNull();
  });

  it('should update an aditional', async () => {
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test description',
      price: 10,
    };

    await aditionalRepository.CreateAditional(aditionalData as CreateAditionalInputModel);
    const [aditional] = await aditionalRepository.GetAllAditionals();

    const updatedData = {
      id: aditional._id,
      name: 'Updated Aditional',
      description: 'Updated description',
      price: 15,
    };

    await aditionalRepository.UpdateAditional(updatedData as UpdateAditionalInputModel);
    const [updatedAditional] = await aditionalRepository.GetAllAditionals();

    expect(updatedAditional.name).toBe('Updated Aditional');
    expect(updatedAditional.description).toBe('Updated description');
    expect(updatedAditional.price).toBe(15);
  });

  it('should delete an aditional', async () => {
    const aditionalData = {
      name: 'Test Aditional',
      description: 'Test description',
      price: 10,
    };

    await aditionalRepository.CreateAditional(aditionalData as CreateAditionalInputModel);
    const [aditional] = await aditionalRepository.GetAllAditionals();

    await aditionalRepository.DeleteAditional(aditional._id);
    const aditionals = await aditionalRepository.GetAllAditionals();

    expect(aditionals.length).toBe(0);
  });
});
