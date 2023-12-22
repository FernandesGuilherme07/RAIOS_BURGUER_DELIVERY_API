import { CreateProductInputModel } from "../../../core/Contracts/inputModel/CreateProductInputModel";
import { UpdateProductInputModel } from "../../../core/Contracts/inputModel/UpdateProductInputModel";
import { IProductRepository } from "../../../core/Contracts/repository/IProductRepository";
import { ProductViewModel } from "../../../core/Contracts/viewModel/ProductViewModel";

export interface ProductModel {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imgUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
export class ProductRepositoryInMemory implements IProductRepository {
  private products: ProductViewModel[] = [];

  async GetAllProducts(): Promise<ProductViewModel[]> {
    return this.products;
  }

  async GetProductByName(name: string): Promise<ProductViewModel | null> {
    return this.products.find((p) => p.name === name) || null;
  }

  async GetProductById(id: string): Promise<ProductViewModel | null> {
    return this.products.find((p) => p._id === id) || null;
  }

  async CreateProduct(data: CreateProductInputModel): Promise<void> {
    const product: ProductViewModel = {
      _id: (this.products.length + 1).toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
  }

  async UpdateProduct(data: UpdateProductInputModel): Promise<void> {
    const existingProductIndex = this.products.findIndex((p) => p._id === data.id);

    if (existingProductIndex !== -1) {
      this.products[existingProductIndex] = {
        ...this.products[existingProductIndex],
        ...data,
        
        updatedAt: new Date(),
      };
    }
  }

  async DeleteProduct(id: string): Promise<void> {
    const productIndex = this.products.findIndex((p) => p._id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }
  }
}
