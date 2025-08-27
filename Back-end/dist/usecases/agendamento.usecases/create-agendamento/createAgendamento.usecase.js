"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgendamentoUsecase = void 0;
const agendamento_1 = require("src/domain/agendamento/entity/agendamento");
class CreateAgendamentoUsecase {
    agendamentoGateway;
    agendamentoValidator;
    constructor(agendamentoGateway, agendamentoValidator) {
        this.agendamentoGateway = agendamentoGateway;
        this.agendamentoValidator = agendamentoValidator;
    }
    static create(agendamentoGateway, agendamentoValidator) {
        return new CreateAgendamentoUsecase(agendamentoGateway, agendamentoValidator);
    }
    async execute({ clienteId, servico, data, horaInicio }) {
        const aAgendamento = agendamento_1.Agendamento.create(clienteId, servico, data, horaInicio);
        try {
            await this.agendamentoValidator.validateNoConflict(aAgendamento);
        }
        catch (error) {
            throw new Error("Não foi possivel criar um agendamento", error);
        }
        await this.agendamentoGateway.save(aAgendamento);
        const output = this.presentOutput(aAgendamento);
        return output;
    }
    presentOutput(agendamento) {
        const output = {
            id: agendamento.id,
            clienteId: agendamento.clienteId,
            servico: agendamento.servico,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status
        };
        return output;
    }
}
exports.CreateAgendamentoUsecase = CreateAgendamentoUsecase;
