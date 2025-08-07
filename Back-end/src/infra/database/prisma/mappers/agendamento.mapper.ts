import { Prisma } from "@prisma/client";
import { Agendamento } from "src/domain/servico/entity/agendamento";
import { AgendamentoMapper } from "./agendamento.mapper.interface";
import { Servico } from "src/domain/servico/entity/servico";
import { Cliente } from "src/domain/servico/entity/cliente";

type PrismaServico = Prisma.ServicoGetPayload<{}>;
type PrismaCliente = Prisma.ClienteGetPayload<{}>;

export class AgendamentoMapperPrisma implements AgendamentoMapper {

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
            status: agendamentoPrisma.status,
            createdAt: agendamentoPrisma.createdAt,
            updatedAt: agendamentoPrisma.updatedAt,
        });
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