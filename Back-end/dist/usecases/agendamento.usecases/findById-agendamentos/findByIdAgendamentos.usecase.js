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
                console.log("Nao foi possível localizar esse agendamento.");
                throw new Error("Não foi possivel localizar esse agendamento");
            }
            return agendamento;
        }
        catch (error) {
            console.error("Erro técnico ao buscar agendamento por ID:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar o agendamento.");
        }
    }
}
exports.FindByIdAgendamentoUsecase = FindByIdAgendamentoUsecase;
