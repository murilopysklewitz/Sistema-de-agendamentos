
import { DeleteServicoInputDto, DeleteServicoUsecase } from "../../../../../usecases/servico.usecases/delete-servico/deleteServico.usecase";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type DeleteServicoResponseDto = void

export class DeleteServicoRoute implements Route {
    private constructor(
        private readonly path:string,
        private readonly method: HttpMethod,
        private readonly deleteServicoService: DeleteServicoUsecase
    ){}
    public static create(deleteServicoService:DeleteServicoUsecase) {
        return new DeleteServicoRoute(  
            "/api/servicos/:id",
            HttpMethod.DELETE,
            deleteServicoService )
    }
    public getHandler() {
        return async (request:Request, response:Response) => {
            const { id } = request.params;

            console.log(`Request para deletar servico com id: ${id}`);

            const input: DeleteServicoInputDto = { id: id as string };

            console.log(`Input para deletar servico: ${JSON.stringify(input)}`);

            await this.deleteServicoService.execute(input);

            console.log(`Resposta para deletar servico: 204`);

            response.status(204).send();
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}