import { updateServicoInputDto, UpdateServicoUsecase,  } from "src/usecases/servico.usecases/update-servico/updateServico.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type updateServicoResponseDto = void;

export class UpdateServicoRoute implements Route {
    private constructor(private readonly path: string,
                        private readonly HttpMethod: HttpMethod,
                        private readonly updateServicoService: UpdateServicoUsecase
    ){}

    public static create(updateServicoService: UpdateServicoUsecase) {
        return new UpdateServicoRoute("/servicos/:id",
                                        HttpMethod.PUT,
                                        updateServicoService
                                        
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params
            const { nome, preco, descricao, destaque, horasDeServico } = request.body;

            const input: updateServicoInputDto = {
                id,
                nome,
                preco,
                descricao,
                destaque,
                horasDeServico,
            }
            try {
            const output: updateServicoResponseDto = await this.updateServicoService.execute(input)
            }catch(error:any) {
                console.error("Erro em updateServicoRoute", error.message)
            }
        }
    }

    public getPath():string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.HttpMethod
    }
}