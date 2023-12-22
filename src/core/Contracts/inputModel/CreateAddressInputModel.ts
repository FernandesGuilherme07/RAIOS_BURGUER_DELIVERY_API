import { Address } from "../../Domain/Entities/Address";

export class CreateAddressInputModel {
    clientId: string;
    zipcode: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    country: string;

    constructor(
        clientId: string,
        zipcode: string,
        street: string,
        number: string,
        city: string,
        state: string,
        country: string,
        complement?: string
    ) {
        this.clientId = clientId;
        this.zipcode = zipcode;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    ToEntity(): Address {
        return new Address(this.zipcode, this.street, this.number, this.city, this.state, this.country,  this.complement)
    }
}