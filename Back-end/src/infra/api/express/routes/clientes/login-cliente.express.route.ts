import { LoginClienteUsecase } from "../../../../../usecases/cliente.usecases/loginCliente.usecase"
import { HttpMethod, Route } from "../routes"
import { Request, Response } from "express"

export class LoginClienteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly loginClienteService: LoginClienteUsecase){}

    public static create(loginClienteService: LoginClienteUsecase) {
        return new LoginClienteRoute(
            "/api/cliente/auth",
            HttpMethod.POST,
            loginClienteService
        )
    }
    public getHandler() {
        return async (request: Request, response: Response) => {
            const {email, senha, role} = request.body
            const output = await this.loginClienteService.execute({email, senha, role})
            
            response.status(200)
        }
    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.httpMethod
    }

}