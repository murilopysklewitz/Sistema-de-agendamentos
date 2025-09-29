import { FindByEmailClienteUsecase } from "../../../../../usecases/cliente.usecases/findByEmail.usecase"
import { HttpMethod, Route } from "../routes"
import { Request, Response } from "express"

export type FindByEmailResponseDto = {
    id: string,
    nome: string,
    email: string,
    numero: string,
}

    export class FindByEmailClienteRoute implements Route {
        private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly findByEmailClientesService: FindByEmailClienteUsecase){}

        public static create(findByEmailClientesService: FindByEmailClienteUsecase){
            return new FindByEmailClienteRoute("/api/clientes/:email", HttpMethod.GET, findByEmailClientesService)
        }

        public getHandler() {
            return async (request: Request, response: Response) => {
                const {email} = request.params
                const cliente = await this.findByEmailClientesService.execute({email})
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