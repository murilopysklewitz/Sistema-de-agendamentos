import { Prisma } from "@prisma/client";
import { Agendamento } from "src/domain/servico/entity/agendamento";

export interface IAgendamentoMapper {
    toDomain(agendamentoPrisma: Prisma.AgendamentoGetPayload<{include: { cliente: true, servico: true } }>): Agendamento;
    toPrisma(agendamento: Agendamento): Prisma.AgendamentoCreateInput
}