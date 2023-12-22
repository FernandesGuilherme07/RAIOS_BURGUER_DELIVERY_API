import Entity from "./Entity";

export class ProductAdditionals extends Entity {
    readonly productId: string;
    readonly aditionals?: string[];

    constructor(ProductId: string, Aditionals?: string[]) {
        super()
        this.productId = ProductId
        this.aditionals = Aditionals

        this.IsRequired(ProductId, "Id do produto é requerido.")
    }

}