import { IAuthenticate } from "../Contracts/Utils/IAuthenticate";
import { IClientRepository } from "../Contracts/repository/IClientRepository";
import { ApplicationViewModel } from "../Contracts/viewModel/ApplicationViewModel";
import { IEncryptPassword } from "../Contracts/Utils/IEncryptPassword";

export class AuthService {
    constructor(
        private readonly clientRepository: IClientRepository,
        private readonly autenticate: IAuthenticate,
        private readonly encrypted: IEncryptPassword
    ) {}

    async login(email: string, password: string): Promise<ApplicationViewModel> {
        const clientExists = await this.clientRepository.GetClientByEmail(email);
        if(!clientExists) {
            return new ApplicationViewModel({
                errors: ["Usuário ou senha inválido."],
                message: "error",
                data: null
            })
        }

        const checkPassword = await this.encrypted.Compare(password, clientExists!.password);

        if (!checkPassword) {
            return new ApplicationViewModel({
                errors: ["Usuário ou senha inválido."],
                message: "error",
                data: null
            })
        }

        return new ApplicationViewModel({
            errors: null,
            message: "success",
            data: {
                client: {
                    id: clientExists!._id,
                    email: clientExists!.email,
                    rule: clientExists!.rule
                },
                token: this.autenticate.generateToken({ id: clientExists!._id, rule: clientExists!.rule })
            }
        })

    }

}