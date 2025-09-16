"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIntervalAgendamentoUsecase = void 0;
class FindByIntervalAgendamentoUsecase {
    agendamentoGateway;
    constructor(agendamentoGateway) {
        this.agendamentoGateway = agendamentoGateway;
    }
    static create(agendamentoGateway) {
        return new FindByIntervalAgendamentoUsecase(agendamentoGateway);
    }
    async execute({ data, horaInicio, horaFim }) {
        try {
            const findByInterval = await this.agendamentoGateway.findByInterval(data, horaInicio, horaFim);
            const output = this.presentOutput(findByInterval);
            return output;
        }
        catch (error) {
            console.error("Erro técnico ao buscar agendamentos por espaço de tempo:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar agendamentos por intervalo de tempo.");
        }
    }
    presentOutput(agendamentos) {
        return {
            agendamentos: agendamentos.map((p) => {
                return {
                    id: p.id,
                    clienteId: p.clienteId,
                    servico: p.servico,
                    data: p.data,
                    horaInicio: p.horaInicio,
                    horaFim: p.horaFim,
                    status: p.status,
                };
            })
        };
    }
}
exports.FindByIntervalAgendamentoUsecase = FindByIntervalAgendamentoUsecase;
