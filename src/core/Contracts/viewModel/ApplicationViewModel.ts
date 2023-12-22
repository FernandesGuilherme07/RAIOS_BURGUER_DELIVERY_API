export class ApplicationViewModel<T= any>  {
    errors: string[] | null;
    message: "error"|"success";
    data: T;

    constructor({errors, message, data}: ApplicationViewModel ) {
        this.errors = errors;
        this.message = message;
        this.data = data;
    }
}