import { Agendamento } from "../entity/agendamento";

export interface AgendamentoGateway {
    save(agendamento: Agendamento): Promise<Agendamento>
    list(): Promise<Agendamento[]>
    findById(id: string): Promise<Agendamento >
    findByInterval(data: Date): Promise<Agendamento[]>
}