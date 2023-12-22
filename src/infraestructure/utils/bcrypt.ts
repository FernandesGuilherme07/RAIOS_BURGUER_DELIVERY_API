import bcrypt from 'bcryptjs';

import { IEncryptPassword } from "../../core/Contracts/Utils/IEncryptPassword";

export class Bcrypt implements IEncryptPassword {
    async Encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, 8);
    }

    async Compare(password: string, encyptPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, encyptPassword)
    }

}