import { Prisma } from "@prisma/client";
import { Agendamento, AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { IAgendamentoMapper } from "./agendamento.mapper.interface";
import { Servico } from "src/domain/servico/entity/servico";
import { Cliente } from "src/domain/cliente/entity/cliente";

type PrismaServico = Prisma.ServicoGetPayload<{}>;
type PrismaCliente = Prisma.ClienteGetPayload<{}>;

export class AgendamentoMapperPrisma implements IAgendamentoMapper {

    public toDomain(agendamentoPrisma: Prisma.AgendamentoGetPayload<{ include: { cliente: true; servico: true; }; }>): Agendamento {
        const servicoDomain = this.mapPrismaServicoToDomain(agendamentoPrisma.servico)
        const clienteDomain = this.mapPrismaClienteToDomain(agendamentoPrisma.cliente) 

        return Agendamento.with({
            id: agendamentoPrisma.id,
            servico: servicoDomain,
            clienteId: clienteDomain.id,
            data: agendamentoPrisma.data,
            horaInicio: agendamentoPrisma.horaInicio,
            horaFim: agendamentoPrisma.horaFim,
            status: agendamentoPrisma.status as AgendamentoStatus,
            createdAt: agendamentoPrisma.createdAt,
            updatedAt: agendamentoPrisma.updatedAt,
        });;
    }

    public toPrisma(agendamento: Agendamento): Prisma.AgendamentoCreateInput {
        return {
            id: agendamento.id,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status,

            servico: {
                connect: { id: agendamento.servico.id },
            },
            cliente: {
                connect: { id: agendamento.clienteId },
            },
        };
    }


    private mapPrismaServicoToDomain(prismaServico: PrismaServico): Servico {
        return Servico.with ({
            id:prismaServico.id,
            nome:prismaServico.nome,
            preco:prismaServico.preco,
            descricao:prismaServico.descricao,
            destaque:prismaServico.destaque,
            duracaoEmMinutos: prismaServico.duracaoEmMinutos
        })
    }
    private mapPrismaClienteToDomain(prismaCliente: PrismaCliente): Cliente {
        return Cliente.with({
            id: prismaCliente.id,
            nome: prismaCliente.nome,
            email: prismaCliente.email
        })
    }
}