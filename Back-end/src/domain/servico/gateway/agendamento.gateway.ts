import { Agendamento } from "../entity/agendamento";

export interface AgendamentoGateway {
    save(agendamento: Agendamento): Promise<void>
    list(): Promise<Agendamento[]>
    findById(id: string): Promise<Agendamento>
    delete(id: string): Promise<void>
    acharConflitoAgendamento(servicoId: string, horaInicio: Date, horaFim: Date): Promise<Agendamento[]>
}