import { ListServicoInputDto, ListServicoOutputDto, ListServicoUsecase } from "../../../../../usecases/servico.usecases/list-servico/listServico.usecase";
import { IMiddleware } from "../../middlewares/IMiddleware";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type ListServicoResponseDto = {
    servicos: {
        id: string;
        nome: string;
        preco: number;
        descricao: string | null;
        destaque: boolean;
        duracaoEmMinutos: number | null;
    }[];
};
export class ListServicosRoute implements Route {
    private readonly middlewares: IMiddleware[] = []
    private constructor(
        private readonly path: string,
        private readonly method:HttpMethod,
        private readonly listServicoService: ListServicoUsecase,
        middlewares: IMiddleware[] =[]
    ){
        middlewares
    }

    public static create(listServicoService: ListServicoUsecase, middlewares: IMiddleware[]) {
        return new ListServicosRoute (
            "/api/servicos",
            HttpMethod.GET,
            listServicoService,
            middlewares
        )
    }

    public getHandler() {
        return async (request:Request, response: Response) => {
            try{
                console.log("Request para ListServicosRoute:", request);
                const output = await this.listServicoService.execute();
                console.log("Response de ListServicosRoute:", output);

                const responseBody = this.present(output);

                console.log("ResponseBody:", responseBody);

                response.status(200).json(responseBody);
        
            }catch(error: any) {
                console.error("Erro ao listar serviços:", error);
                response.status(500).json({ message: "Erro interno ao listar serviços" });
            }
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

    private present(input:ListServicoOutputDto): ListServicoResponseDto {
        const response: ListServicoResponseDto = {
            servicos: input.servicos.map((servico) => ({
                id: servico.id,
                nome: servico.nome,
                preco: servico.preco,
                descricao:servico.descricao,
                destaque: servico.destaque,
                duracaoEmMinutos: servico.duracaoEmMinutos
            }))
        }
        return response
    }
}