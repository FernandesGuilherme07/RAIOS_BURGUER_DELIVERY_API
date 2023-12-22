import { TestDomainNotifications } from "./TestDomainNotifications";

describe('DomainNotifications', () => {
    let domainNotifications: TestDomainNotifications;
  
    beforeEach(() => {
      domainNotifications = new TestDomainNotifications();
    });
  
    it('should add a notification if data is required', () => {
      domainNotifications.testIsRequired(null, 'This field is required.');
      expect(domainNotifications.notifications).toContain('This field is required.');
    });
  
    it('should add a notification if email is invalid', () => {
      domainNotifications.testIsValidEmail('invalid-email', 'Invalid email.');
      expect(domainNotifications.notifications).toContain('Invalid email.');
    });
  
    it('should add a notification if string length exceeds the maximum', () => {
      domainNotifications.testMaxLength('toolongstring', 5, 'String is too long.');
      expect(domainNotifications.notifications).toContain('String is too long.');
    });
  
    it('should add a notification if string length is less than the minimum', () => {
      domainNotifications.testMinLength('short', 10, 'String is too short.');
      expect(domainNotifications.notifications).toContain('String is too short.');
    });
  
    it('should add a notification if CEP is invalid', () => {
      domainNotifications.testIsValidCEP('123', 'Invalid CEP.');
      expect(domainNotifications.notifications).toContain('Invalid CEP.');
    });
  
    it('should add a notification if password and confirmation do not match', () => {
      domainNotifications.testPasswordConfirmation('password', 'differentpassword', 'Passwords do not match.');
      expect(domainNotifications.notifications).toContain('Passwords do not match.');
    });
  
    it('should be valid if no notifications are added', () => {
      expect(domainNotifications.IsValid()).toBe(true);
    });
  });