
import { ServicoProps } from "../../../../../domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";
import { AgendamentoStatus } from "../../../../../domain/agendamento/entity/agendamento";
import { ListAgendamentoUsecase } from "../../../../../usecases/agendamento.usecases/listAgendamento.usecase";
import { IMiddleware } from "../../middlewares/IMiddleware";
export type ListAgendamentoResponseDto = {
    agendamentos: {
        id: string;
        clienteId: string;
        servicoId: string;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

export class ListAgendamentoRoute implements Route {
    private readonly middlewares: IMiddleware[] = []
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listAgendamentoService: ListAgendamentoUsecase,
        middlewares: IMiddleware[]
    ){
        this.middlewares = middlewares
    }

    public static create(listAgendamentoService: ListAgendamentoUsecase, middlewares: IMiddleware[]) {
        return new ListAgendamentoRoute(
            "/api/agendamentos",
            HttpMethod.GET,
            listAgendamentoService,
            middlewares
        
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try{
                console.log("Request to ListAgendamentoRoute:", request);
                const result = await this.listAgendamentoService.execute();
                console.log("Response from ListAgendamentoRoute:", result);
                response.status(200).json(result)
            }catch(error: any) {
                console.error("Erro na rota listAgendamento:", error);
                throw new Error("erro na rota listAgendamento");
            }
        }
    }

    public getMethod(): HttpMethod {
        return this.method
    }
    public getPath(): string {
        return this.path
    }
    public getMiddlewares(): IMiddleware[] {
        return this.middlewares
    }
}