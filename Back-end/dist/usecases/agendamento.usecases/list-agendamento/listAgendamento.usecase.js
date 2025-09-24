"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAgendamentoUsecase = void 0;
class ListAgendamentoUsecase {
    agendamentoGateway;
    constructor(agendamentoGateway) {
        this.agendamentoGateway = agendamentoGateway;
    }
    static create(agendamentoGateway) {
        return new ListAgendamentoUsecase(agendamentoGateway);
    }
    async execute() {
        const listarServicos = await this.agendamentoGateway.list();
        const output = this.presentOutput(listarServicos);
        return output;
    }
    presentOutput(agendamentos) {
        return {
            agendamentos: agendamentos.map((p) => {
                return {
                    id: p.id,
                    clienteId: p.cliente.id,
                    servicoId: p.servico.id,
                    data: p.data,
                    horaInicio: p.horaInicio,
                    horaFim: p.horaFim,
                    status: p.status,
                };
            })
        };
    }
}
exports.ListAgendamentoUsecase = ListAgendamentoUsecase;
