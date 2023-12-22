import { Aditional } from "../../Domain/Entities/Aditional";

export class CreateAditionalInputModel {
    name: string;
    description: string; 
    price: number;
    constructor(name: string, description: string, price: number) {
        this.name = name
        this.description = description
        this.price = price
    }

    ToEntity(): Aditional {
        return new Aditional(this.name, this.description, this.price)
    }
}