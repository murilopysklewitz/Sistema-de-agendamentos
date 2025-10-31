import { Request, Response } from "express"
import { ListClienteUsecase } from "../../../../../usecases/cliente.usecases/listCliente.usecase"
import { HttpMethod, Route } from "../routes"
import { ClienteRole } from "../../../../../domain/cliente/entity/cliente"
import { IMiddleware } from "../../middlewares/IMiddleware"

export type ListClienteResponseDTO = {
    clientes:{
        id: string,
        nome: string,
        email: string,
        numero: string,
        role: ClienteRole
    }[]
}

export class ListClienteRoute implements Route {
    private readonly middlewares: IMiddleware[] =[]
    private constructor(
        private readonly path:string,
        private readonly method:HttpMethod,
        private readonly listClienteService: ListClienteUsecase,
        middlewares: IMiddleware[]
        ){
        this.middlewares = middlewares
    }

    public static create(listClienteService: ListClienteUsecase, middleware: IMiddleware[]){
        return new ListClienteRoute("/api/clientes", HttpMethod.GET, listClienteService, middleware)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            console.log(`Request body: ${JSON.stringify(request.body)}`)
            console.log(`Request params: ${JSON.stringify(request.params)}`)
            console.log(`Request listar clientes`)

            const output = await this.listClienteService.execute()

            console.log(`Response body: ${JSON.stringify(output)}`)

            response.status(200).json(this.present(output))
        }
    }

    public present(input: ListClienteResponseDTO): ListClienteResponseDTO {
        return {
            clientes: input.clientes.map((cliente) => ({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
                role: cliente.role
            }))
        }
    }

    public getPath(): string {
        return this.path    
    }
    
    public getMethod(): HttpMethod {
        return this.method
    }

    public getMiddlewares(): IMiddleware[] {
        return this.middlewares
    }

}