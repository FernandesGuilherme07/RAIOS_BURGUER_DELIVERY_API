import { Product } from "../../Domain/Entities/Product";

export class UpdateProductInputModel {
    id: string;
    name: string;
    description: string;
    category: string
    price: number;
    imgUrl?: string;

    constructor(
        id: string,
        name: string,
        description: string,
        price: number,
        category: string,
        imgUrl?: string,
    ) {
        this.id = id
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