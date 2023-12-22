import { Request, Response } from "express";
import { AuthServiceContainer } from "../Container";

interface ILoginData  { 
    email: string, 
    password: string 
}

export class AuthController {
    private authService = AuthServiceContainer;

    async Login (req: Request, res: Response): Promise<void> {
        
    const {email, password}: ILoginData = req.body;

        try {
            const response = await this.authService.login(email, password);
    
            if (response.message === "error") {
            res.status(400).json(response);
            } else {
            res.status(200).json(response);
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
      
    }
}
