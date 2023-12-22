import { Client } from "../../Domain/Entities/Client";

export class UpdateClientDataInputModel {
    id: string;
    name: string;
    email: string;
    rule: "admin" | "client";
    password: string;

    constructor(
        id: string,
        name: string,
        email: string,
        rule: "admin" | "client",
        password: string,
    ) {
        this.id = id
        this.name = name;
        this.email = email;
        this.rule = rule;
        this.password = password;
    }

    ToEntity(): Client {
        return new Client(this.name, this.email, this.password, this.rule);
    }
}