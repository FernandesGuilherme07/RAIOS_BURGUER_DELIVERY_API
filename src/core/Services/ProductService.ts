import { CreateProductInputModel } from "../Contracts/inputModel/CreateProductInputModel";
import { UpdateProductInputModel } from "../Contracts/inputModel/UpdateProductInputModel";
import { IProductRepository } from "../Contracts/repository/IProductRepository";
import { ProductViewModel } from "../Contracts/viewModel/ProductViewModel";
import { ApplicationViewModel } from "../Contracts/viewModel/ApplicationViewModel";
import { IProductAditionalsRepository } from "../Contracts/repository/IProductAditionalsRepository";
import { CreateProductAdtionalsInputModel } from "../Contracts/inputModel/CreateProductAdtionalsInputModel";

export class ProductService {
    constructor(
      private productRepository: IProductRepository,
      private productAditionalsRepository: IProductAditionalsRepository
      ) {}
  
    async getAllProducts(): Promise<ApplicationViewModel<ProductViewModel[]>> {
      const data =  await this.productRepository.GetAllProducts();
      
      const applicationViewModel = new ApplicationViewModel({errors: null, message: "success", data})

      return applicationViewModel
    }
  
    async getProductById(productId: string): Promise<ApplicationViewModel<ProductViewModel | null>> {
      if(!productId) {
        return new ApplicationViewModel({errors: ["Id do produto é requerido"], message: "error", data: null})
      }

      const product =  await this.productRepository.GetProductById(productId);

      if(!product) {
        return new ApplicationViewModel({errors: ["Não existem produtos com este id."], message: "error", data: null})
      }
      
      return new ApplicationViewModel({errors: null, message: "success", data: product})
    }
  
    async createProduct(data: CreateProductInputModel): Promise<ApplicationViewModel> {
      const product = data.ToEntity();

      if(!product.IsValid()){
        return new ApplicationViewModel({errors: product.notifications, message: "error", data: null})
      }

      const productNameExists = await this.productRepository.GetProductByName(data.name)

      if(productNameExists){
        return new ApplicationViewModel({errors: ["Já existe produto cadastrado com este nome."], message: "error", data: null})
      }

      await this.productRepository.CreateProduct(data);

      const productData = await this.productRepository.GetProductByName(data.name);

      if(productData?._id) await this.productAditionalsRepository.CreateProductAditionals({productId: productData._id} as CreateProductAdtionalsInputModel)
      
      return new ApplicationViewModel({errors: null, message: "success", data: product})
    }
  
    async updateProduct(data: UpdateProductInputModel): Promise<ApplicationViewModel> {
      const product = data.ToEntity();

      if(!product.IsValid()){
        return new ApplicationViewModel({errors: product.notifications, message: "error", data: null})
      }

      const productExists =  await this.productRepository.GetProductById(data.id);

      if(!productExists) {
        return new ApplicationViewModel({errors: ["Não existem produtos com este id."], message: "error", data: null})
      }

      const productNameExists = await this.productRepository.GetProductByName(data.name)
      
      if(productNameExists){
        return new ApplicationViewModel({errors: ["Já existe produto cadastrado com este nome."], message: "error", data: null})
      }

      await this.productRepository.UpdateProduct(data);
      
      return new ApplicationViewModel({errors: null, message: "success", data: "Produto alterado com sucesso"})
    }
  
    async deleteProduct(productId: string): Promise<ApplicationViewModel> {

      const productExists =  await this.productRepository.GetProductById(productId);

      if(!productExists) {
        return new ApplicationViewModel({errors: ["Não existem produtos com este id."], message: "error", data: null})
      }
      
      await this.productRepository.DeleteProduct(productId)

      await this.productAditionalsRepository.DeleteProductAdtionalsByProductId(productId)
      
      return new ApplicationViewModel({errors: null, message: "success", data: "Produto deletado com sucesso"})
    }
  }