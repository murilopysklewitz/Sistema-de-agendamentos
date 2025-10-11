import { Prisma } from "@prisma/client";
import { IAgendamentoMapper } from "./agendamento.mapper.interface";
import { Agendamento, AgendamentoStatus } from "../../../../domain/agendamento/entity/agendamento";
import { Servico } from "../../../../domain/servico/entity/servico";
import { Cliente } from "../../../../domain/cliente/entity/cliente";
import { clienteMapper } from "./cliente.mapper";

type PrismaServico = Prisma.ServicoGetPayload<{}>;
type PrismaCliente = Prisma.ClienteGetPayload<{}>;

export class AgendamentoMapperPrisma implements IAgendamentoMapper {

    public toDomain(agendamentoPrisma: Prisma.AgendamentoGetPayload<{ include: { cliente: true; servico: true; }; }>): Agendamento {
        console.log("AgendamentoMapperPrisma.toDomain - agendamentoPrisma:", agendamentoPrisma);
        const servicoDomain = this.mapPrismaServicoToDomain(agendamentoPrisma.servico)
        console.log("AgendamentoMapperPrisma.toDomain - servicoDomain:", servicoDomain);
        const clienteDomain = this.mapPrismaClienteToDomain(agendamentoPrisma.cliente)
        console.log("AgendamentoMapperPrisma.toDomain - clienteDomain:", clienteDomain);

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
        console.log("AgendamentoMapperPrisma.toPrisma - agendamento:", agendamento)
        const output ={
            id: agendamento.id,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status,

            servico: {
                connect: { id: agendamento.servico.id },
            },
            cliente: {
                connect: { id: agendamento.cliente.id },
            },
        }
        console.log("AgendamentoMapperPrisma.toPrisma - output:", output)
        return output

    }


    private mapPrismaServicoToDomain(prismaServico: PrismaServico): Servico {
        console.log("AgendamentoMapperPrisma.mapPrismaServicoToDomain - prismaServico:", prismaServico);
        const output = Servico.with({
            id:prismaServico.id,
            nome:prismaServico.nome,
            preco:prismaServico.preco,
            descricao:prismaServico.descricao,
            destaque:prismaServico.destaque,
            duracaoEmMinutos: prismaServico.duracaoEmMinutos
        })
        console.log("AgendamentoMapperPrisma.mapPrismaServicoToDomain - output:", output);
        return output;
    }
    private mapPrismaClienteToDomain(prismaCliente: PrismaCliente): Cliente {
        console.log("AgendamentoMapperPrisma.mapPrismaClienteToDomain - prismaCliente:", prismaCliente);
        const output = Cliente.with({
            id: prismaCliente.id,
            nome: prismaCliente.nome,
            email: prismaCliente.email,
            numero: prismaCliente.numero,
            senha: prismaCliente.senha,
            role: clienteMapper.toDomainRole(prismaCliente.role)
        })
        console.log("AgendamentoMapperPrisma.mapPrismaClienteToDomain - output:", output);
        return output;
    }
}