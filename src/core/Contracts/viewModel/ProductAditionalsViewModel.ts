import { AditionalViewModel } from "./AditionalViewModel";

export interface ProductAditionalsViewModel {
        ProductId: string;
        name: string; 
        description: string; 
        price: number; 
        category: string;
        imgUrl?: string;
        createdAt: Date;
        updatedAt: Date;
        aditionals: AditionalViewModel[] | string[];
}