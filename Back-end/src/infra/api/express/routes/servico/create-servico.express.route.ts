
import { CreateServicoInputDto, CreateServicoUseCase } from "../../../../../usecases/servico.usecases/create-servico/createServico.usecase";
import { IMiddleware } from "../../middlewares/IMiddleware";
import { HttpMethod, Route } from "../routes";
import { Response, Request } from "express";

export type CreateServicoResponseDto = {
    id:string;
}
export class CreateServicoRoute implements Route {
    private readonly middlewares: IMiddleware[] = []

    private constructor (
        private readonly path:string,
        private readonly method:HttpMethod,
        private readonly createServicoService: CreateServicoUseCase,
        middlewares: IMiddleware[] = []
    ) {
        this.middlewares = middlewares
    }

    public static create(createServicoService:CreateServicoUseCase, middlewares: IMiddleware[] =[]) {
        return new CreateServicoRoute( 
            "/api/servicos",
            HttpMethod.POST,
            createServicoService,
            middlewares
        );
    }
    public getHandler() {
        return async (request:Request, response:Response) => {
            const {nome, preco, descricao, destaque, duracaoEmMinutos} = request.body;
            
            const input: CreateServicoInputDto = {
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos
            }

            const output: CreateServicoResponseDto = await this.createServicoService.execute(input);
            const responseBody = this.present(output);
            response.status(201).json(responseBody);
        }
    }

    public getPath():string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getMiddlewares(): IMiddleware[] {
        return this.middlewares
    }

    private present(input:CreateServicoResponseDto): CreateServicoResponseDto {
        const response = {id:input.id}
        return response;
    }
}