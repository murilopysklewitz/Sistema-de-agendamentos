import { Request, Response } from "express"
import { ListClienteUsecase } from "../../../../../usecases/cliente.usecases/listCliente.usecase"
import { HttpMethod, Route } from "../routes"
import { ClienteRole } from "domain/cliente/entity/cliente"

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
    private constructor(private readonly path:string, private readonly method:HttpMethod, private readonly listClienteService: ListClienteUsecase){}

    public static create(listClienteService: ListClienteUsecase){
        return new ListClienteRoute("/api/clientes", HttpMethod.GET, listClienteService)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listClienteService.execute()
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

}