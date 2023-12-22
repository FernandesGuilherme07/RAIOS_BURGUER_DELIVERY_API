import { Aditional } from "../../Domain/Entities/Aditional";

export class UpdateAditionalInputModel {
    id: string;
    name: string;
    description: string; 
    price: number;
    constructor(id: string, name: string, description: string, price: number) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
    }

    ToEntity(): Aditional {
        return new Aditional(this.name, this.description, this.price)
    } 
}