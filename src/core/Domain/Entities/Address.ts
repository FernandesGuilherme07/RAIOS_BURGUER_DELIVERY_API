import Entity from "./Entity";

export class Address extends Entity {
    readonly zipCode: string;
    readonly street: string;
    readonly number: string;
    readonly complement?: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;

    constructor(
        zipcode: string,
        street: string,
        number: string,
        city: string,
        state: string,
        country: string,
        complement?: string
    ) {
        super()
        this.zipCode = zipcode;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.city = city;
        this.state = state;
        this.country = country;

        this.ValidateAddressData(zipcode, street, number, city, state, country)
    }

    private ValidateAddressData(
        zipCode: string,
        street: string,
        number: string,
        city: string,
        state: string,
        country: string
    ): void {
        this.IsValidCEP(zipCode)
        this.IsRequired(street, "O nome da rua é requerido para a criação do endereço.");
        this.IsRequired(number, "O numero é requerido para a criação do endereço.");
        this.IsRequired(city, "A cidade é requerida para a criação do endereço.");
        this.IsRequired(state, "O estado é requeirdo para a criação do endereço.");
        this.IsRequired(country, "O país é requeirdo para a criação do endereço.");
    };

}