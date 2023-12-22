import { CreateProductInputModel } from "../../../core/Contracts/inputModel/CreateProductInputModel";
import { UpdateProductInputModel } from "../../../core/Contracts/inputModel/UpdateProductInputModel";
import { IProductRepository } from "../../../core/Contracts/repository/IProductRepository";
import { ProductViewModel } from "../../../core/Contracts/viewModel/ProductViewModel";
import { ProductModel, ProductMongooseModel } from "../../models/ProductModel";
import mongoose from 'mongoose';

export class MongooseProductRepository implements IProductRepository {
  async GetAllProducts(): Promise<ProductViewModel[]> {
    const products = await ProductMongooseModel.find().lean();

    return products.map((product) => this.mapToViewModel(product));
  }

  async GetProductById(id: string): Promise<ProductViewModel | null> {
    const product: ProductModel | null = await ProductMongooseModel.findById(id).lean();
    return product ? this.mapToViewModel(product) : null;
  }

  async GetProductByName(name: string): Promise<ProductViewModel | null> {
    const product: ProductModel | null = await ProductMongooseModel.findOne({name}).lean();
    return product?.name ? this.mapToViewModel(product) : null;
  }

  async CreateProduct(data: CreateProductInputModel): Promise<void> {
    await ProductMongooseModel.create(data);
  }

  async UpdateProduct(data: UpdateProductInputModel): Promise<void> {
    await ProductMongooseModel.findByIdAndUpdate(data.id, data);
  }

  async DeleteProduct(id: string): Promise<void> {
    await ProductMongooseModel.findByIdAndDelete(id);
  }

  private async ObjectIdIsValid(productId: string) {
    return !!mongoose.Types.ObjectId.isValid(productId)
     
  }

  private mapToViewModel(data: ProductModel ): ProductViewModel {
    const {_id, name, description, price, imgUrl, createdAt, updatedAt, category } = data;

   
    return {
      _id,
      imgUrl,
      name,
      description,
      price,
      category,
      createdAt,
      updatedAt,
    };
  }
}
