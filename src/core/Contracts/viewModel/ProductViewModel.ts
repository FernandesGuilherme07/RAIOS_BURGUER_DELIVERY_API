export interface ProductViewModel {
    _id: string;
    name: string; 
    description: string; 
    price: number; 
    category: string;
    imgUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}