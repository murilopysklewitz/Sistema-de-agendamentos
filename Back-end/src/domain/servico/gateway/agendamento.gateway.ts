import { Agendamento } from "../entity/agendamento";

export interface AgendamentoGateway {
    save(agendamento: Agendamento): Promise<Agendamento>
    list(): Promise<Agendamento[]>
    findById(id: string): Promise<Agendamento | null>
    findByInterval(data: Date, horaInicio: Date, horaFim: Date): Promise<Agendamento[]>
}