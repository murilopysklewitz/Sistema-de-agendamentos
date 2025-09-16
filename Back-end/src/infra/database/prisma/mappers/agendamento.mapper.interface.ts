import { Prisma } from "@prisma/client";
import { Agendamento } from "../../../../domain/agendamento/entity/agendamento";

export interface IAgendamentoMapper {
    toDomain(agendamentoPrisma: Prisma.AgendamentoGetPayload<{include: { cliente: true, servico: true } }>): Agendamento;
    toPrisma(agendamento: Agendamento): Prisma.AgendamentoCreateInput
}