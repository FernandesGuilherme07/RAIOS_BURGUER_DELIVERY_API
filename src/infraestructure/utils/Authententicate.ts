import { IAuthenticate, ITokenPayload } from "../../core/Contracts/Utils/IAuthenticate";
import { Auth } from "../configs/Auth";
import { sign, verify } from "jsonwebtoken";

export class Authenticate implements IAuthenticate {
    generateToken(payload: ITokenPayload): string {
        return sign(payload, Auth.secret, { expiresIn: Auth.expiresIn });
    }
    
    verifyToken(token: string): ITokenPayload | null {
    const decoded = verify(token, Auth.secret) as ITokenPayload;
        return decoded;
      }
}