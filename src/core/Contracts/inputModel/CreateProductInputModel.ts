
import { Product } from "../../Domain/Entities/Product";

export class CreateProductInputModel {
    name: string;
    description: string;
    price: number;
    category: string;
    imgUrl?: string;

    constructor(
        name: string,
        description: string,
        price: number,
        category: string,
        imgUrl?: string,
    ) {
        this.name = name
        this.description = description
        this.category = category
        this.price = price
        this.imgUrl = imgUrl
    }

    ToEntity(): Product {
        return new Product(
          this.name,
          this.description,
          this.price,
          this.category,
          this.imgUrl,
        );
      }
}