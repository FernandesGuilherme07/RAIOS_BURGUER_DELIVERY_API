import Entity from "./Entity";

export class Account extends Entity {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly rule: "admin" | "client";

    constructor(
        name: string,
        email: string,
        password: string,
        rule: "admin" | "client"
    ) {
        super()
        this.name = name
        this.email = email
        this.password = password
        this.rule = rule

        this.ValidationAccountData(name, email, password)
    }


    private ValidationAccountData(
        name: string,
        email: string,
        password: string,
    ) {
        this.IsRequired(name, "Nome do usuário é requValidationAccountDataerido.");
        this.IsValidEmail(email);
        this.IsRequired(password, "Senha de usuário é requerida.");
        this.MinLength(password, 6, "Senha deve possuir no minimo 6 caracteres.");
        this.MaxLength(password, 10, "Senha deve possuir no máximo 10 caracteres.")
    }

}