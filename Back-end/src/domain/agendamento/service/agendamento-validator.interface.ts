import { Agendamento } from "../entity/agendamento";

export interface AgendamentoValidator {

    validateAll(agendamento: Agendamento): Promise<void>
}