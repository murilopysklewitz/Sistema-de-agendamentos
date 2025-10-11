import { Request, Response } from "express"
import { FindByIdClienteUsecase } from "../../../../../usecases/cliente.usecases/findById.usecase"
import { HttpMethod, Route } from "../routes"
import { ClienteRole } from "../../../../../domain/cliente/entity/cliente"

export type FindByIdClienteResponseDto = {
        id: string,
        nome: string,
        email: string,
        numero: string,
        role: ClienteRole
}

    export class FindByIdClienteRoute implements Route {
        private constructor(private readonly path: string, private readonly method: HttpMethod, private readonly findByIdClientesService: FindByIdClienteUsecase){}

        public static create(findByIdClientesService: FindByIdClienteUsecase){
            return new FindByIdClienteRoute("/api/clientes/:id", HttpMethod.GET, findByIdClientesService)
        }

        public getHandler() {
            return async (request: Request, response: Response) => {
                const {id} = request.params
                console.log(`Request para achar cliente por id: ${id}`)
                const cliente = await this.findByIdClientesService.execute({id})
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
