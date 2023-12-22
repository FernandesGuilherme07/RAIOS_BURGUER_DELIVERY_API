import { Account } from "./Account";
import { Address } from "./Address";

export class Client extends Account {
    readonly Addresses?: Address[];

    constructor(
        name: string,
        email: string,
        password: string,
    ) {
        super(name, email, password, "client");
    }
}