"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdAgendamentoUsecase = void 0;
class FindByIdAgendamentoUsecase {
    agendamentoGateway;
    constructor(agendamentoGateway) {
        this.agendamentoGateway = agendamentoGateway;
    }
    static create(agendamentoGateway) {
        return new FindByIdAgendamentoUsecase(agendamentoGateway);
    }
    async execute({ id }) {
        try {
            const agendamento = await this.agendamentoGateway.findById(id);
            if (!agendamento) {
                throw new Error("Não foi possivel localizar esse agendamento");
            }
            const output = this.presentOutput(agendamento);
            return output;
        }
        catch (error) {
            console.error("Erro técnico ao buscar agendamento por ID:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar o agendamento.");
        }
    }
    presentOutput(agendamento) {
        const output = {
            id: agendamento.id,
            clienteId: agendamento.cliente.id,
            servicoId: agendamento.servico.id,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status
        };
        return output;
    }
}
exports.FindByIdAgendamentoUsecase = FindByIdAgendamentoUsecase;
