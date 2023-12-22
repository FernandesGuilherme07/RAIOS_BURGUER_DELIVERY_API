export type AddressViewModel = {
    _id:string;
    zipcode: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}