import Entity from "./Entity";


export class Product extends Entity {
    readonly name: string;
    readonly description: string;
    readonly category:string;
    readonly price: number;
    readonly imgUrl?: string;

    constructor(  
        name: string,
        description: string,
        price: number,
        category: string,
        imgUrl?: string,
        ) {
        super()
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imgUrl = imgUrl

        this.ValidateProductData(name, description, price, category)
    };

    private ValidateProductData( 
        name: string,
        description: string,
        price: number,
        category: string
    ): void {
        this.IsRequired(name, "O nome do produto é requerido.");
        this.IsRequired(description, "A descrição do produto é requerida.");
        this.IsRequired(price, "O preço do produto é requerido.");
        this.IsRequired(category, "A categoria do produto é requerida.");
    };
};

