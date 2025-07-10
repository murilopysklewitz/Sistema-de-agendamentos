import { ListServicoInputDto, ListServicoOutputDto, ListServicoUsecase } from "../../../../../usecases/list-servico/listServico.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type ListServicoResponseDto = {
    servicos: {
        id: string;
        name: string;
        price: number;
        description:string | null;
        highlight: boolean;
    }[];
};
export class ListServicosRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly method:HttpMethod,
        private readonly listServicoService: ListServicoUsecase,
    ){}

    public static create(listServicoService: ListServicoUsecase) {
        return new ListServicosRoute (
            "/servicos",
            HttpMethod.GET,
            listServicoService,
        )
    }

    public getHandler() {
        return async (request:Request, response: Response) => {
            const output = await this.listServicoService.execute();

            const responseBody = await this.present(output);

            response.status(200).json(responseBody).send();
        }
    }

    public getPath():string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input:ListServicoOutputDto): ListServicoResponseDto {
        const response: ListServicoResponseDto = {
            servicos: input.servicos.map((servico) => ({
                id: servico.id,
                name: servico.name,
                price: servico.price,
                description:servico.description,
                highlight: servico.highlight,
            }))
        }
        return response
    }
}