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
                console.log("Requisição recebida em /api/clientes/auth", request.body)

                const { email, senha } = request.body

                console.log("Iniciando login com email:", email)

                const output = await this.loginClienteService.execute({ email, senha })

                console.log("Login realizado com sucesso:", output)

                response.status(200).json(output)
            } catch (error: any) {
                console.error("Erro no login:", error.message, error.stack)

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