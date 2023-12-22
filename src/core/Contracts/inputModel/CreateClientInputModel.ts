import { Client } from "../../Domain/Entities/Client";

export class CreateClientInputModel {
    name: string;
    email: string;
    rule: "admin" | "client";
    password: string;

    constructor(
        name: string,
        email: string,
        password: string,
        rule: "admin" | "client" = "client",
    ) {
        this.name = name;
        this.email = email;
        this.rule = rule;
        this.password = password;
    }

    ToEntity(): Client {
        return new Client(this.name, this.email, this.password, this.rule);
    }
}