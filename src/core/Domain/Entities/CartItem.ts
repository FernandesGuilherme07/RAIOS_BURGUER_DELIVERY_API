import Entity from "./Entity";
import { ItemAditionals } from "./ItemAditionals";

export class CartItem extends Entity {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly itemAditionals?: ItemAditionals[];


    constructor(
        name: string,
        price: number,
        quantity: number,
        itemAditionals?: ItemAditionals[]
    ) {
        super()
        this.name = name
        this.price = price
        this.quantity = quantity
        this.itemAditionals = itemAditionals

        this.IsRequired(name, "Nome do item é requerido.")
        this.IsRequired(price, "Preço do item é requerido.")
        this.IsRequired(quantity, "Quantidade do item é requerido.")
    }
}