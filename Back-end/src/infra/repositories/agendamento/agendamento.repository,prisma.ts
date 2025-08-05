import { PrismaClient } from "@prisma/client";
import { Agendamento } from "src/domain/servico/entity/agendamento";
import { AgendamentoGateway } from "src/domain/servico/gateway/agendamento.gateway";

export class AgendamentoRepository implements AgendamentoGateway {

    private constructor(private readonly prismaClient: PrismaClient) {

    }

    public static create(prismaClient: PrismaClient) {
        return new AgendamentoRepository(prismaClient);
    }

    public async save(agendamento: Agendamento): Promise<void> {
        await this.prismaClient.agendamento.upsert({
            where: { id: agendamento.id },
            update: {
                status: agendamento.status,
                horaInicio: agendamento.horaInicio,
                horaFim: agendamento.horaFim,
                data: agendamento.data
            },
            create: {
                id: agendamento.id,
            
                clienteId: agendamento.clienteId,
                servicoId: agendamento.servico.id,

                data: agendamento.data,
                horaInicio: agendamento.horaInicio,
                horaFim: agendamento.horaFim,
                status: agendamento.status,
            },
        });
    }

    public async list(): Promise<Agendamento[]> {
        const agendamentos = await this.prismaClient.agendamento.findMany();
        const agendamentoList = agendamentos.map((p) => {
            const agendamento = Agendamento.with({
                id: p.id,
                servicoId: p.servicoId,
                clienteId: p.clienteId,

                data: p.data,
                horaInicio: p.horaInicio,
                horaFim: p.horaFim,

                status: p.status,



            })
            return agendamento
        })
        return agendamentoList
    }

}