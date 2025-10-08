"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoMapperPrisma = void 0;
const agendamento_1 = require("../../../../domain/agendamento/entity/agendamento");
const servico_1 = require("../../../../domain/servico/entity/servico");
const cliente_1 = require("../../../../domain/cliente/entity/cliente");
class AgendamentoMapperPrisma {
    toDomain(agendamentoPrisma) {
        const servicoDomain = this.mapPrismaServicoToDomain(agendamentoPrisma.servico);
        const clienteDomain = this.mapPrismaClienteToDomain(agendamentoPrisma.cliente);
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
                connect: { id: agendamento.cliente.id },
            },
        };
    }
    mapPrismaServicoToDomain(prismaServico) {
        return servico_1.Servico.with({
            id: prismaServico.id,
            nome: prismaServico.nome,
            preco: prismaServico.preco,
            descricao: prismaServico.descricao,
            destaque: prismaServico.destaque,
            duracaoEmMinutos: prismaServico.duracaoEmMinutos
        });
    }
    mapPrismaClienteToDomain(prismaCliente) {
        return cliente_1.Cliente.with({
            id: prismaCliente.id,
            nome: prismaCliente.nome,
            email: prismaCliente.email,
            numero: prismaCliente.numero,
            senha: prismaCliente.senha
        });
    }
}
exports.AgendamentoMapperPrisma = AgendamentoMapperPrisma;
