import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { ServicoProps } from "src/domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { FindByIntervalAgendamentoUsecase } from "src/usecases/agendamento.usecases/findByInterval-agendamento/findByIntervalAgendamento.Usecase";
import { Request, Response } from "express";

export type FindByIntervalAgendamentoResponse = {
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
export class FindByIntervalAgendamentoRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly findByIntervalAgendamentoService: FindByIntervalAgendamentoUsecase
    ) {}

    public static create(findByIntervalAgendamentoService: FindByIntervalAgendamentoUsecase) {
        return new FindByIntervalAgendamentoRoute("/api/agendamentos", HttpMethod.GET, findByIntervalAgendamentoService)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try{
                const {data, horaInicio, horaFim} = request.body
                const agendamentosachados = await this.findByIntervalAgendamentoService.execute({data, horaInicio, horaFim})
                response.status(200).json(agendamentosachados)
            }catch(error: any){
                throw new Error("Erro desconhecido no FindByIntervalAgendamentoRoute", error)
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