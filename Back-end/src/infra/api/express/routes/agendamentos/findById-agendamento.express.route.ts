
import { ServicoProps } from "../../../../../domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";
import { AgendamentoStatus } from "../../../../../domain/agendamento/entity/agendamento";
import { FindByIdAgendamentoInputDto, FindByIdAgendamentoUsecase } from "../../../../../usecases/agendamento.usecases/findByIdAgendamentos.usecase";
import { IMiddleware } from "../../middlewares/IMiddleware";

export type FindByIdAgendamentoResponseDto = {
        id: string;
        clienteId: string;
        servico: ServicoProps;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus ;
        createdAt: Date;
        updatedAt: Date;
}

export class FindByIdAgendamentoRoute implements Route {
    private readonly middlewares: IMiddleware[] = []
    private constructor(
        private readonly path:string,
        private readonly method: HttpMethod,
        private readonly findByIdAgendamentoService: FindByIdAgendamentoUsecase,
        middlewares: IMiddleware[]
    ){}

    public static create(findByIdAgendamentoService: FindByIdAgendamentoUsecase,middlewares: IMiddleware[]){
        return new FindByIdAgendamentoRoute("/api/agendamentos/:id", HttpMethod.GET ,findByIdAgendamentoService, middlewares);
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                console.log("FindByIdAgendamentoRoute.getHandler - Request:", request);
                const {id} = request.params;
                const input: FindByIdAgendamentoInputDto = {id};
                console.log("FindByIdAgendamentoRoute.getHandler - Input:", input);

                const result = await this.findByIdAgendamentoService.execute(input);
                console.log("FindByIdAgendamentoRoute.getHandler - Result:", result);

                response.status(200).json(result);
            } catch (error: any) {
                console.error("Erro na rota findById:", error);
                response.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }


    public getPath(): string {
        return this.path;
    }
    public getMethod(): HttpMethod {
        return this.method;
    }
    public getMiddlewares(): IMiddleware[] {
        return this.middlewares
    }


}