import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { Servico } from "src/domain/servico/entity/servico";

export type FindByIdAgendamentoInputDTO = {
    id: string;
}

export type FindByIdAgendamentoOutputDTO = {
        agendamento: {
        id: string;
        clienteId: string;
        servico: Servico;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus ;
        }
}