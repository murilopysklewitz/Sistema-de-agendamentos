import { DeleteClienteUsecase } from "../../../../../usecases/cliente.usecases/deleteCliente.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export class DeleteClienteRoute implements Route {
    private constructor(private readonly path:string, private readonly method: HttpMethod, private readonly deleteClienteService: DeleteClienteUsecase){}

    public static create(deleteClienteService: DeleteClienteUsecase){
        return new DeleteClienteRoute("/api/clientes/:id", HttpMethod.DELETE, deleteClienteService)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            console.log(`Request to delete cliente with id ${request.params.id}`)
            const {id} = request.params
            console.log(`Deleting cliente with id ${id}`)
            const deleteCliente = await this.deleteClienteService.execute({id})
            console.log(`Deleted cliente with id ${id}`)
            response.status(204).send()
        }
    }
    public getMethod(): HttpMethod {
        return this.method
    }
    public getPath(): string {
        return this.path
    }
}