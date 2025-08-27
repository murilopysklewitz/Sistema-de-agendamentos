import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { ServicoProps } from "src/domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { CreateAgendamentoUsecase } from "src/usecases/agendamento.usecases/create-agendamento/createAgendamento.usecase";

export type createAgendamentoRouteResponseDto = {
            id: string;
            clienteId: string;
            servico: ServicoProps;
            data: Date;
            horaInicio: Date;
            horaFim: Date;
            status: AgendamentoStatus ;
}
export class CreateAgendamentoRoute implements Route {
    private constructor(
        private readonly path:string,
        private readonly httpMethod: HttpMethod,
        private readonly createAgendamentoService: CreateAgendamentoUsecase,
    ){}

    public static create(createAgendamentoService: CreateAgendamentoUsecase) {
        
    }
}