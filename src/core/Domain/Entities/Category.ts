import Entity from "./Entity";

export class Category extends Entity {
    readonly name: string;

    constructor(name: string) {
        super()
        this.name = name;

        this.IsRequired(name, "Nome da categoria é requerido.")
    }
}