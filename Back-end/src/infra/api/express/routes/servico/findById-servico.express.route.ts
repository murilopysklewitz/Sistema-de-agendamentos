

import { FindByIdServicoInputDto, FindByIdServicoUsecase } from "../../../../../usecases/servico.usecases/findById-servico/findByIdServico.usecase";
import { IMiddleware } from "../../middlewares/IMiddleware";
import { HttpMethod, Route, } from "../routes";
import { Request, Response } from "express";

export type findByIdResponseDto = {
    servico: {
    id: string;
    nome: string;
    preco: number;
    descricao:string | null;
    destaque: boolean;
    duracaoEmMinutos: number
    }
}

export class FindByIdServicoRoute implements Route {
    private readonly middlewares: IMiddleware[] = []
    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly findByIdServicoService: FindByIdServicoUsecase,
        middlewares: IMiddleware[] = []
    ){
        this.middlewares = middlewares
    }
    public static create(findByIdServicoService: FindByIdServicoUsecase, middlewares: IMiddleware[]) {
        return new FindByIdServicoRoute(
            "/api/servicos/:id",
            HttpMethod.GET,
            findByIdServicoService,
            middlewares
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const { id } = request.params;
                const input: FindByIdServicoInputDto = { id };
                
                console.log(`Request to findById with id: ${id}`);
                
                const result = await this.findByIdServicoService.execute(input);
    
                console.log(`Response from findById: ${JSON.stringify(result)}`);
    
                if (!result) {
                 response.status(404).json({ message: "Serviço não encontrado" });
                }
    
                response.status(200).json(result);
            } catch (error: any) {
                console.error(`Erro na rota findById: ${error.message}`);
                response.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }

    public getMethod(): HttpMethod {
        return this.httpMethod
    }

    public getPath(): string {
        return this.path
    }
    public getMiddlewares(): IMiddleware[] {
        return this.middlewares
    }
}