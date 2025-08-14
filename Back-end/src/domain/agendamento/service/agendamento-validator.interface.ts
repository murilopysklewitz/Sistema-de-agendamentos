import { Agendamento } from "../entity/agendamento";

export interface AgendamentoValidator {

    validateNoConflict(agendamento: Agendamento): Promise<void>
}