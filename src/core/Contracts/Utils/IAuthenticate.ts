export interface ITokenPayload {
    id: string;
    rule: string;
}

export interface IAuthenticate {
    generateToken(payload: ITokenPayload): string;
    verifyToken(token: string): ITokenPayload | null;
}