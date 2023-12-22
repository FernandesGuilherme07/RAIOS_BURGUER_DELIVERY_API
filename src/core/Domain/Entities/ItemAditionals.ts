import Entity from "./Entity";

export class ItemAditionals extends Entity {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;

    constructor(name: string, price: number, quantity: number) {
        super()
        this.name = name
        this.price = price
        this.quantity = quantity

        this.IsRequired(name, "Nome do adicional é requerido.")
        this.IsRequired(price, "Preço do adicional é requerido.")
        this.IsRequired(quantity, "Quantidade do adicional é requerido.")
    }
}