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
            "/api/clientes/auth",
            HttpMethod.POST,
            loginClienteService
        )
    }
    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const { email, senha } = request.body

                console.log("Requisição recebida em /api/clientes/auth", { email })

                const output = await this.loginClienteService.execute({ email, senha })

                console.log("Login realizado com sucesso:", output)

                response.status(200).json(output)
            } catch (error: any) {
                console.error("rro no login:", error.message)
                response.status(401).json({ message: error.message || "Falha na autenticação" })
            }
        }
    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.httpMethod
    }

}