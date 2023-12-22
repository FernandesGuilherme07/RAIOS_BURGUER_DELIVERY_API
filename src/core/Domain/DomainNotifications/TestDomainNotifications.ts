import { DomainNotifications } from './DomainNotifications';


export class TestDomainNotifications extends DomainNotifications {
    // Expor os métodos protegidos para testes
    testIsRequired(data: any, message: string) {
      this.IsRequired(data, message);
    }
  
    testIsValidEmail(email: string, message: string = 'E-mail inválido.') {
      this.IsValidEmail(email, message);
    }
  
    testMaxLength(data: string, maxLength: number, message: string) {
      this.MaxLength(data, maxLength, message);
    }
  
    testMinLength(data: string, minLength: number, message: string) {
      this.MinLength(data, minLength, message);
    }
  
    testIsValidCEP(cep: string, message: string = 'CEP inválido.') {
      this.IsValidCEP(cep, message);
    }
  
    testPasswordConfirmation(password: string, confirmPassword: string, message = 'Senha e confirme senha não são iguais.') {
      this.PasswordConfirmation(password, confirmPassword, message);
    }
  }
  