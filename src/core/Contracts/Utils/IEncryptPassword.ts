export interface IEncryptPassword {
    Encrypt(password: string): Promise<string>;
    Compare(password: string, encyptPassword: string): Promise<boolean>
}