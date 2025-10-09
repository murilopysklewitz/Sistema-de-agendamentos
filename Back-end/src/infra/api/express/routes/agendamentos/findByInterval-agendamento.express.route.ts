import { ServicoProps } from "../../../../../domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes"
import { Request, Response } from "express";
import { AgendamentoStatus } from "../../../../../domain/agendamento/entity/agendamento";
import { FindByIntervalAgendamentoUsecase } from "../../../../../usecases/agendamento.usecases/findByIntervalAgendamento.Usecase";


export type FindByIntervalAgendamentoResponse = {
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