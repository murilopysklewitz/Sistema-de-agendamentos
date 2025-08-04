import { PrismaClient } from "@prisma/client";
import { Agendamento } from "src/domain/servico/entity/agendamento";
import { AgendamentoGateway } from "src/domain/servico/gateway/agendamento.gateway";

export class AgendamentoRepository implements AgendamentoGateway {

    private constructor(private readonly prismaClient: PrismaClient) {

    }

    public static create(prismaClient: PrismaClient) {
        return new AgendamentoRepository(prismaClient);
    }

    public save(agendamento: Agendamento): Promise<void> {
        
    }

}