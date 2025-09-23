import { CreateClienteInputDto, CreateClienteUsecase } from "usecases/cliente.usecases/createCliente.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type CreateClienteRouteResponse = { 
    id: string
};


export class CreateClienteRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly createClienteService: CreateClienteUsecase
    ){}

    public static create(createClienteService: CreateClienteUsecase) {
        return new CreateClienteRoute(
            "/api/cliente",
             HttpMethod.POST,
            createClienteService 
        )
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            const {nome, email, numero} = request.body

            const input: CreateClienteInputDto = {
                nome, email, numero
            }

            const output = await this.createClienteService.execute(input)
            const responseBody= this.present(output)
            response.status(204).json(responseBody)
        }
    }

    public present(input:CreateClienteRouteResponse): CreateClienteRouteResponse {
        const response = {id: input.id}
        return response
    }
    public getPath(): string {
     return this.path   
    }

    public getMethod(): HttpMethod {
        return this.httpMethod
    }
}