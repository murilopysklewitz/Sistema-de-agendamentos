import { Prisma } from "@prisma/client";
import { IAgendamentoMapper } from "./agendamento.mapper.interface";
import { Agendamento, AgendamentoStatus } from "../../../../domain/agendamento/entity/agendamento";
import { Servico } from "../../../../domain/servico/entity/servico";
import { Cliente } from "../../../../domain/cliente/entity/cliente";

type PrismaServico = Prisma.ServicoGetPayload<{}>;
type PrismaCliente = Prisma.ClienteGetPayload<{}>;

export class AgendamentoMapperPrisma implements IAgendamentoMapper {

    public toDomain(agendamentoPrisma: Prisma.AgendamentoGetPayload<{ include: { cliente: true; servico: true; }; }>): Agendamento {
        const servicoDomain = this.mapPrismaServicoToDomain(agendamentoPrisma.servico)
        const clienteDomain = this.mapPrismaClienteToDomain(agendamentoPrisma.cliente) 

        return Agendamento.with({
            id: agendamentoPrisma.id,
            servico: servicoDomain,
            cliente: clienteDomain,
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
                connect: { id: agendamento.cliente.id},
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
            email: prismaCliente.email,
            numero: prismaCliente.numero
        })
    }
}