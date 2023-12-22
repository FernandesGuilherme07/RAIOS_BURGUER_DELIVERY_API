import { ProductAdditionals } from "../../Domain/Entities/ProductAdicionals";

export class CreateProductAdtionalsInputModel {
    productId: string;
    aditionalIds?: string[];

    constructor(productId: string, aditionalIds?: string[]) {
        this.productId = productId
        this.aditionalIds = aditionalIds
    }

    ToEntity(): ProductAdditionals {
        return new ProductAdditionals(this.productId, this.aditionalIds)
    }

}