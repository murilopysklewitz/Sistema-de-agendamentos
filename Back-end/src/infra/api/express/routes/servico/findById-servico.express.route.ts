import { FindByIdServicoInputDto, FindByIdServicoOutputDto, FindByIdServicoUsecase } from "src/usecases/findById/findByIdServico.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type findByIdResponseDto = {
    servico: {
    id: string;
    name: string;
    price: number;
    description:string | null;
    highlight: boolean;
    }
}

export class FindByIdServicoRoute implements Route {
    private constructor(private readonly path: string,
                        private readonly httpMethod: HttpMethod,
                        private readonly findByIdServicoService: FindByIdServicoUsecase
    ){

    }
    public static create(findByIdServicoService: FindByIdServicoUsecase) {
        return new FindByIdServicoRoute("/servico:id",
                                        HttpMethod.GET,
                                        findByIdServicoService,
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;

            const input: FindByIdServicoInputDto = { id: id as string};

            const output: FindByIdServicoOutputDto = await this.findByIdServicoService.execute(input);

            response.status(200).json(output).send(); 
        }
    }

    public getMethod(): HttpMethod {
        return this.httpMethod
    }

    public getPath(): string {
        return this.path
    }
}