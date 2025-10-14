"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoMapperPrisma = void 0;
const agendamento_1 = require("../../../../domain/agendamento/entity/agendamento");
const servico_1 = require("../../../../domain/servico/entity/servico");
const cliente_1 = require("../../../../domain/cliente/entity/cliente");
const cliente_mapper_1 = require("./cliente.mapper");
class AgendamentoMapperPrisma {
    toDomain(agendamentoPrisma) {
        console.log("AgendamentoMapperPrisma.toDomain - agendamentoPrisma:", agendamentoPrisma);
        const servicoDomain = this.mapPrismaServicoToDomain(agendamentoPrisma.servico);
        console.log("AgendamentoMapperPrisma.toDomain - servicoDomain:", servicoDomain);
        const clienteDomain = this.mapPrismaClienteToDomain(agendamentoPrisma.cliente);
        console.log("AgendamentoMapperPrisma.toDomain - clienteDomain:", clienteDomain);
        return agendamento_1.Agendamento.with({
            id: agendamentoPrisma.id,
            servico: servicoDomain,
            cliente: clienteDomain,
            data: agendamentoPrisma.data,
            horaInicio: agendamentoPrisma.horaInicio,
            horaFim: agendamentoPrisma.horaFim,
            status: agendamentoPrisma.status,
            createdAt: agendamentoPrisma.createdAt,
            updatedAt: agendamentoPrisma.updatedAt,
        });
        ;
    }
    toPrisma(agendamento) {
        console.log("AgendamentoMapperPrisma.toPrisma - agendamento:", agendamento);
        const output = {
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
        };
        console.log("AgendamentoMapperPrisma.toPrisma - output:", output);
        return output;
    }
    mapPrismaServicoToDomain(prismaServico) {
        console.log("AgendamentoMapperPrisma.mapPrismaServicoToDomain - prismaServico:", prismaServico);
        const output = servico_1.Servico.with({
            id: prismaServico.id,
            nome: prismaServico.nome,
            preco: prismaServico.preco,
            descricao: prismaServico.descricao,
            destaque: prismaServico.destaque,
            duracaoEmMinutos: prismaServico.duracaoEmMinutos
        });
        console.log("AgendamentoMapperPrisma.mapPrismaServicoToDomain - output:", output);
        return output;
    }
    mapPrismaClienteToDomain(prismaCliente) {
        console.log("AgendamentoMapperPrisma.mapPrismaClienteToDomain - prismaCliente:", prismaCliente);
        const output = cliente_1.Cliente.with({
            id: prismaCliente.id,
            nome: prismaCliente.nome,
            email: prismaCliente.email,
            numero: prismaCliente.numero,
            senha: prismaCliente.senha,
            role: cliente_mapper_1.clienteMapper.toDomainRole(prismaCliente.role)
        });
        console.log("AgendamentoMapperPrisma.mapPrismaClienteToDomain - output:", output);
        return output;
    }
}
exports.AgendamentoMapperPrisma = AgendamentoMapperPrisma;
