import { CreateClienteInputDto, CreateClienteUsecase } from "../../../../../usecases/cliente.usecases/createCliente.usecase";
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
            "/api/clientes",
             HttpMethod.POST,
            createClienteService 
        )
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            console.log("Request body:")
            console.log(request.body)

            const {nome, email, numero, senha, role} = request.body

            const input: CreateClienteInputDto = {
                nome, email, numero, senha, role
            }

            console.log("Input to CreateClienteUsecase:")
            console.log(input)

            const output = await this.createClienteService.execute(input)
            console.log("Output from CreateClienteUsecase:")
            console.log(output)

            const responseBody= this.present(output)
            console.log("Response body:")
            console.log(responseBody)

            response.status(201).json(responseBody)
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