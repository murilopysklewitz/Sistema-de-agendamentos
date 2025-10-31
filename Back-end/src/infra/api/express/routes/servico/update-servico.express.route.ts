
import { updateServicoInputDto, UpdateServicoUsecase } from "../../../../../usecases/servico.usecases/update-servico/updateServico.usecase";
import { IMiddleware } from "../../middlewares/IMiddleware";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";

export type updateServicoResponseDto = void;

export class UpdateServicoRoute implements Route {
    private readonly middlewares: IMiddleware[] =[]
    private constructor(
        private readonly path: string,
        private readonly HttpMethod: HttpMethod,
        private readonly updateServicoService: UpdateServicoUsecase,
        middlewares: IMiddleware[]
    ) { 
        this.middlewares = middlewares
    }

    public static create(updateServicoService: UpdateServicoUsecase, middlewares: IMiddleware[]) {
        return new UpdateServicoRoute(
            "/api/servicos/:id",
            HttpMethod.PUT,
            updateServicoService,
            middlewares
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params
            const { nome, preco, descricao, destaque, duracaoEmMinutos } = request.body;

            console.log(`Request body: ${JSON.stringify({ nome, preco, descricao, destaque, duracaoEmMinutos })}`)

            if (!id) {
                console.error("Erro em updateServicoRoute: ID de serviço é obrigatório")
                throw new Error("ID de serviço é obrigatório")
            }

            const input: updateServicoInputDto = {
                id,
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos,
            }

            console.log(`Request input: ${JSON.stringify(input)}`)

            try {
                const output: updateServicoResponseDto = await this.updateServicoService.execute(input)
                console.log(`Response from updateServicoRoute: ${JSON.stringify(output)}`)
                response.status(200).json(input).send()
            } catch (error: any) {
                console.error(`Erro em updateServicoRoute: ${error.message}`)

                if (error.message.includes("obrigatório") || error.message.includes("negativo") || error.message.includes("vazio")) {
                    response.status(400).json({ message: error.message }).send();
                } else {
                    response.status(500).json({ message: "Erro interno do servidor." }).send();
                }
            }
        }
    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): HttpMethod {
        return this.HttpMethod
    }

    public getMiddlewares(): IMiddleware[] {
        return this.middlewares
    }
}