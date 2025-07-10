
import { CreateServicoInputDto, CreateServicoUseCase } from "../../../../../usecases/create-servico/createServico.usecase";
import { HttpMethod, Route } from "../routes";
import { Response, Request } from "express";

export type CreateServicoResponseDto = {
    id:string;
}
export class CreateServicoRoute implements Route {

    private constructor (private readonly path:string,
                        private readonly method:HttpMethod,
                        private readonly createServicoService: CreateServicoUseCase 
    ) {

    }

    public static create(createServicoService:CreateServicoUseCase) {
        return new CreateServicoRoute( "/servicos",
            HttpMethod.POST,
            createServicoService
        );
    }
    public getHandler() {
        return async (request:Request, response:Response) => {
            const {name, price} = request.body;
            
            const input: CreateServicoInputDto = {
                name,
                price
            }

            const output: CreateServicoResponseDto = await this.createServicoService.execute(input);
            const responseBody = this.present(output);
            response.status(201).json(responseBody).send();
        }
    }

    public getPath():string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input:CreateServicoResponseDto): CreateServicoResponseDto {
        const response = {id:input.id}
        return response;
    }
}