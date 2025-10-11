import { ClienteRole } from "../../../../../domain/cliente/entity/cliente"
import { FindByEmailClienteUsecase } from "../../../../../usecases/cliente.usecases/findByEmail.usecase"
import { HttpMethod, Route } from "../routes"
import { Request, Response } from "express"

export type FindByEmailResponseDto = {
    id: string,
    nome: string,
    email: string,
    numero: string,
    role: ClienteRole
}

    export class FindByEmailClienteRoute implements Route {
        private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly findByEmailClientesService: FindByEmailClienteUsecase){}

        public static create(findByEmailClientesService: FindByEmailClienteUsecase){
            return new FindByEmailClienteRoute("/api/clientes/:email", HttpMethod.GET, findByEmailClientesService)
        }

        public getHandler() {
            return async (request: Request, response: Response) => {
                console.log(`Request body: ${JSON.stringify(request.body)}`)
                console.log(`Request params: ${JSON.stringify(request.params)}`)
                const {email} = request.params
                console.log(`Request para achar cliente ${email}`)
                const cliente = await this.findByEmailClientesService.execute({email})
                console.log(`Response body: ${JSON.stringify(cliente)}`)
                response.status(200).json(cliente)
            }
        }

        public getPath(): string {
            return this.path
        }

        public getMethod(): HttpMethod {
            return this.method
        }
    }