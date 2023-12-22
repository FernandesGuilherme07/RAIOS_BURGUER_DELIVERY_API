import Entity from "./Entity";

export class Aditional extends Entity {
    readonly name: string;
    readonly description: string;
    readonly price: number;

    constructor(name: string, description: string, price: number) {
        super();
        this.name =  name;
        this.description = description;
        this.price = price

        this.ValidateAditionalData(name, description, price)
    }

    private ValidateAditionalData( 
        name: string,
        description: string,
        price: number,
    ): void { 
        this.IsRequired(name, "Nome do adicional é requerido.");
        this.IsRequired(description, "Descrição do adicional é requerido.");
        this.IsRequired(price, "Preço do adicional é requerido.");
    }
  }