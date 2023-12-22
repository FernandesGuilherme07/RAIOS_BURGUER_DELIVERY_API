import { CreateProductInputModel } from "../inputModel/CreateProductInputModel";
import { UpdateProductInputModel } from "../inputModel/UpdateProductInputModel";
import { ProductViewModel } from "../viewModel/ProductViewModel";

export interface IProductRepository {
    GetAllProducts(): Promise<ProductViewModel[]>;
    GetProductByName(name: string): Promise<ProductViewModel | null>;
    GetProductById(id: string): Promise<ProductViewModel | null>;
    CreateProduct(data: CreateProductInputModel): Promise<void>;
    UpdateProduct(data: UpdateProductInputModel): Promise<void>;
    DeleteProduct(id: string): Promise<void>
}