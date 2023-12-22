import { CreateProductAdtionalsInputModel } from "../Contracts/inputModel/CreateProductAdtionalsInputModel";
import { UpdateProductAdtionalsInputModel } from "../Contracts/inputModel/UpdateProductAditionalsInputModel";
import { IAditionalRepository } from "../Contracts/repository/IAditionalRespository";
import { IProductAditionalsRepository } from "../Contracts/repository/IProductAditionalsRepository";
import { IProductRepository } from "../Contracts/repository/IProductRepository";
import { ApplicationViewModel } from "../Contracts/viewModel/ApplicationViewModel";
import { ProductAditionalsViewModel } from "../Contracts/viewModel/ProductAditionalsViewModel";

export class ProductAditionalsService {
  private notifications: string[] = [];
  
  constructor(
    private productAditionalsRepository: IProductAditionalsRepository,
    private productRepository: IProductRepository,
    private aditionalRepository: IAditionalRepository
    ) {}

  async getAllProductsWithAditionals(): Promise<ApplicationViewModel<ProductAditionalsViewModel[]>> {
    const data = await this.productAditionalsRepository.GetAllProductsWithAditionals();

    const applicationViewModel = new ApplicationViewModel({ errors: null, message: "success", data });

    return applicationViewModel;
  }

  async getProductWithAditionalsByProductId(productId: string): Promise<ApplicationViewModel<ProductAditionalsViewModel | null>> {
    if (!productId) {
      return new ApplicationViewModel({ errors: ["Id do produto é requerido"], message: "error", data: null });
    }

    const product = await this.productAditionalsRepository.GetProductWithAditionalsByProductId(productId);

    if (!product) {
      return new ApplicationViewModel({ errors: ["Não existe Produto cadastrado com este id."], message: "error", data: null });
    }

    return new ApplicationViewModel({ errors: null, message: "success", data: product });
  }

  async createProductAditionals(data: CreateProductAdtionalsInputModel): Promise<ApplicationViewModel> {

    if(!data.ToEntity().IsValid()) {
        return new ApplicationViewModel({ errors: data.ToEntity().notifications, message: "error", data: null });
    }

    const ProductExists =  await this.productRepository.GetProductById(data.productId);
    
    if(!ProductExists) {
      return new ApplicationViewModel({ errors: ["Não existe Produto cadastrado com este id."], message: "error", data: null });
    }

    data.aditionalIds?.map(async (aditional) => {
      const aditionalExists = await this.aditionalRepository.GetAditionalById(aditional)

      if(!aditionalExists) {
        this.notifications.push("Não existem adicionias com este id: " + aditional )
      }
    })

    if(this.notifications.length > 0) {
      return new ApplicationViewModel({ errors: this.notifications, message: "error", data: null });
    }

    await this.productAditionalsRepository.CreateProductAditionals(data);

    return new ApplicationViewModel({ errors: null, message: "success", data });
  }

  async addAditionalsIntoProductAditionalsByProductId(data: UpdateProductAdtionalsInputModel): Promise<ApplicationViewModel> {
    const ProductExists =  await this.productRepository.GetProductById(data.productId);
    
    if(!ProductExists) {
      return new ApplicationViewModel({ errors: ["Não existe Produto cadastrado com este id."], message: "error", data: null });
    }
  
    await this.productAditionalsRepository.AddAditionalsIntoProductAdtionalsByProductId(data);

    data.aditionalIds?.map(async (aditional) => {
      const aditionalExists = await this.aditionalRepository.GetAditionalById(aditional)

      if(!aditionalExists) {
        this.notifications.push("Não existem adicionias com este id: " + aditional )
      }
    })

    if(this.notifications.length > 0) {
      return new ApplicationViewModel({ errors: this.notifications, message: "error", data: null });
    }

    return new ApplicationViewModel({ errors: null, message: "success", data });
  }

  async removeProductAditionalsByProductId(data: UpdateProductAdtionalsInputModel): Promise<ApplicationViewModel> {
    const ProductExists =  await this.productRepository.GetProductById(data.productId);
    
    if(!ProductExists) {
      return new ApplicationViewModel({ errors: ["Não existe Produto cadastrado com este id."], message: "error", data: null });
    }

    await this.productAditionalsRepository.RemoveProductAdtionalsByProductId(data);

    data.aditionalIds?.map(async (aditional) => {
      const aditionalExists = await this.aditionalRepository.GetAditionalById(aditional)

      if(!aditionalExists) {
        this.notifications.push("Não existem adicionias com este id: " + aditional )
      }
    })

    if(this.notifications.length > 0) {
      return new ApplicationViewModel({ errors: this.notifications, message: "error", data: null });
    }

    return new ApplicationViewModel({ errors: null, message: "success", data });
  }

  async deleteProductAditionalsByProductId(productId: string): Promise<ApplicationViewModel> {
    const ProductExists =  await this.productRepository.GetProductById(productId);
    
    if(!ProductExists) {
      return new ApplicationViewModel({ errors: ["Não existe Produto com este id"], message: "error", data: null });
    }
    await this.productAditionalsRepository.DeleteProductAdtionalsByProductId(productId);

    return new ApplicationViewModel({ errors: null, message: "success", data: "Produto adicionais deletados com sucesso" });
  }
}
