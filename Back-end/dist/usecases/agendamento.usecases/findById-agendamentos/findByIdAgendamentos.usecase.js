"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdAgendamento = void 0;
class FindByIdAgendamento {
    agendamentoGateway;
    constructor(agendamentoGateway) {
        this.agendamentoGateway = agendamentoGateway;
    }
    static create(agendamentoGateway) {
        return new FindByIdAgendamento(agendamentoGateway);
    }
    async execute({ id }) {
        try {
            const agendamento = await this.agendamentoGateway.findById(id);
            if (!agendamento) {
                console.log("Nao foi possível localizar esse agendamento.");
                return null;
            }
            return agendamento;
        }
        catch (error) {
            console.error("Erro técnico ao buscar agendamento por ID:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar o agendamento.");
        }
    }
}
exports.FindByIdAgendamento = FindByIdAgendamento;
