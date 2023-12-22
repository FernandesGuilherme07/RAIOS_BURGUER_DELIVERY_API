import mongoose from "mongoose";
import { CreateProductAdtionalsInputModel } from "../../../core/Contracts/inputModel/CreateProductAdtionalsInputModel";
import { UpdateProductAdtionalsInputModel } from "../../../core/Contracts/inputModel/UpdateProductAditionalsInputModel";
import { IProductAditionalsRepository } from "../../../core/Contracts/repository/IProductAditionalsRepository";
import { ProductAditionalsViewModel } from "../../../core/Contracts/viewModel/ProductAditionalsViewModel";
import ProductAdditionalsModel, { IProductAditionals } from "../../models/ProductAdicionalsModel";
import { AditionalViewModel } from "../../../core/Contracts/viewModel/AditionalViewModel";

export class MongooseProductAditionalsRepository implements IProductAditionalsRepository {
  async GetAllProductsWithAditionals(): Promise<ProductAditionalsViewModel[]> {
    const products = await ProductAdditionalsModel.find().populate('productId').populate('aditionals').lean();

    return products.map((product) => this.mapToViewModel(product));
  }

  async GetProductWithAditionalsByProductId(id: string): Promise<ProductAditionalsViewModel | null> {
    const product: IProductAditionals | null = await ProductAdditionalsModel.findOne({ productId: id })
      .populate('productId')
      .populate('aditionals')
      .lean();

    return product ? this.mapToViewModel(product) : null;
  }

  async CreateProductAditionals(data: CreateProductAdtionalsInputModel): Promise<void> {
    await ProductAdditionalsModel.create(data);
  }

  async AddAditionalsIntoProductAdtionalsByProductId(data: UpdateProductAdtionalsInputModel): Promise<void> {
    if (!(await this.ObjectIdIsValid(data.productId))) {
      throw new Error('Invalid productId');
    }

    await ProductAdditionalsModel.findOneAndUpdate(
      { productId: data.productId },
      { $addToSet: { aditionals: { $each: data.aditionalIds } } }
    );
  }

  async RemoveProductAdtionalsByProductId(data: UpdateProductAdtionalsInputModel): Promise<void> {
    if (!(await this.ObjectIdIsValid(data.productId))) {
      throw new Error('Invalid productId');
    }

    await ProductAdditionalsModel.findOneAndUpdate(
      { productId: data.productId },
      { $pullAll: { aditionals: data.aditionalIds } }
    );
  }

  async DeleteProductAdtionalsByProductId(productId: string): Promise<void> {
    if (!(await this.ObjectIdIsValid(productId))) {
      throw new Error('Invalid productId');
    }

    await ProductAdditionalsModel.findOneAndDelete({ productId });
  }

  private async ObjectIdIsValid(productId: string) {
    return !!mongoose.Types.ObjectId.isValid(productId);
  }

  private mapToViewModel(data: any): ProductAditionalsViewModel {
    const { productId, aditionals } = data;

    return {
      ProductId: productId._id,
      name: productId.name,
      description: productId.description,
      price: productId.price,
      category: productId.category,
      imgUrl: productId.imgUrl,
      createdAt: productId.createdAt,
      updatedAt: productId.updatedAt,
      aditionals: aditionals.map((additional: AditionalViewModel) => ({
        _id: additional._id,
        name: additional.name,
        description: additional.description,
        price: additional.price,
        createdAt: additional.createdAt,
        updatedAt: additional.updatedAt,
      })),
    };
  }
}
