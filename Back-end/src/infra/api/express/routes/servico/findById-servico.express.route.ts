
import { FindByIdServicoInputDto, FindByIdServicoUsecase } from "src/usecases/servico.usecases/findById-servico/findByIdServico.usecase";
import { HttpMethod, Route, } from "../routes";
import { Request, Response } from "express";

export type findByIdResponseDto = {
    servico: {
    id: string;
    nome: string;
    preco: number;
    descricao:string | null;
    destaque: boolean;
    horasDeServico: number
    }
}

export class FindByIdServicoRoute implements Route {
    private constructor(private readonly path: string,
                        private readonly httpMethod: HttpMethod,
                        private readonly findByIdServicoService: FindByIdServicoUsecase
    ){

    }
    public static create(findByIdServicoService: FindByIdServicoUsecase) {
        return new FindByIdServicoRoute("/servicos/:id",
                                        HttpMethod.GET,
                                        findByIdServicoService,
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const { id } = request.params;
                const input: FindByIdServicoInputDto = { id };
                
                const result = await this.findByIdServicoService.execute(input);
    
                if (!result) {
                 response.status(404).json({ message: "Serviço não encontrado" });
                }
    
                response.status(200).json(result);
            } catch (error) {
                console.error("Erro na rota findById:", error);
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
}