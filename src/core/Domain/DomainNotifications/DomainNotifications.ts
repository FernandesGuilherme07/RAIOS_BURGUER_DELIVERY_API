export class DomainNotifications {
    readonly notifications: string[] = []

    IsValid(): boolean {
     return this.notifications.length < 1
    }

    protected IsRequired(data: any, message: string) {
        if(!data) {
            this.notifications.push(message)
        }
    }
    protected IsValidEmail(email: string, message: string = "E-mail inválido.") {
        // Regex básica para validar um endereço de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) this.notifications.push(message);
    }
    
    protected MaxLength(data: string, maxLength: number, message: string) {
        if(data.length > maxLength) this.notifications.push(message)
    }

    protected MinLength(data: string, minLength: number, message: string) {
        if(data.length < minLength) this.notifications.push(message)
    }

    protected IsValidCEP(cep: string, message: string = "CEP inválido.") {
        const cleanedCEP = cep.replace(/\D/g, '');

        if (cleanedCEP.length !== 8) {
            this.notifications.push(message);
            return;
        }

        const cepRegex = /^[0-9]{8}$/;
        if (!cepRegex.test(cleanedCEP)) {
            this.notifications.push(message);
        }
    }

    protected PasswordConfirmation(password: string, confirmPassword: string, message = "senha e confirme senha não são iguais.") {
        if(password !== confirmPassword) this.notifications.push(message)
    }
}