import { CreateProductAdtionalsInputModel } from "../inputModel/CreateProductAdtionalsInputModel";
import { UpdateProductAdtionalsInputModel } from "../inputModel/UpdateProductAditionalsInputModel";
import { ProductAditionalsViewModel } from "../viewModel/ProductAditionalsViewModel";

export interface IProductAditionalsRepository {
    GetAllProductsWithAditionals(): Promise<ProductAditionalsViewModel[]>;
    GetProductWithAditionalsByProductId(id: string): Promise<ProductAditionalsViewModel | null>;
    CreateProductAditionals(data: CreateProductAdtionalsInputModel): Promise<void>;
    AddAditionalsIntoProductAdtionalsByProductId(data: UpdateProductAdtionalsInputModel): Promise<void>;
    RemoveProductAdtionalsByProductId(data: UpdateProductAdtionalsInputModel): Promise<void>;
    DeleteProductAdtionalsByProductId(ProductId: string): Promise<void>;
}