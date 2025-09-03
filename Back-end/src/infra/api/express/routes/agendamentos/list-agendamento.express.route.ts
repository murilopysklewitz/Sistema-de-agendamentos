import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { ServicoProps } from "src/domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";
import { ListAgendamentoUsecase } from "src/usecases/agendamento.usecases/list-agendamento/listAgendamento.usecase";

export type ListAgendamentoResponseDto = {
    agendamentos: {
        id: string;
        clienteId: string;
        servico: ServicoProps;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

export class ListAgendamentoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listAgendamentoService: ListAgendamentoUsecase,
    ){}

    public static create(listAgendamentoService: ListAgendamentoUsecase) {
        return new ListAgendamentoRoute(
            "/api/agendamentos",
            HttpMethod.GET,
            listAgendamentoService)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try{
                const result = await this.listAgendamentoService.execute();
                response.status(200).json(result)
            }catch(error: any) {
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
}