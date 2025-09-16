"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgendamentoUsecase = void 0;
const agendamento_1 = require("src/domain/agendamento/entity/agendamento");
class CreateAgendamentoUsecase {
    agendamentoGateway;
    agendamentoValidator;
    servicoGateway;
    constructor(agendamentoGateway, agendamentoValidator, servicoGateway) {
        this.agendamentoGateway = agendamentoGateway;
        this.agendamentoValidator = agendamentoValidator;
        this.servicoGateway = servicoGateway;
    }
    static create(agendamentoGateway, agendamentoValidator, servicoGateway) {
        return new CreateAgendamentoUsecase(agendamentoGateway, agendamentoValidator, servicoGateway);
    }
    async execute({ clienteId, servicoId, data, horaInicio }) {
        const servicoSelecionado = await this.servicoGateway.findById(servicoId);
        if (!servicoSelecionado) {
            throw new Error("Serviço com id não encontrado");
        }
        const aAgendamento = agendamento_1.Agendamento.create(clienteId, servicoSelecionado, data, horaInicio);
        try {
            await this.agendamentoValidator.validateNoConflict(aAgendamento);
        }
        catch (error) {
            throw new Error("Não foi possivel criar um agendamento, conflito de horário", error);
        }
        await this.agendamentoGateway.save(aAgendamento);
        const output = this.presentOutput(aAgendamento, servicoSelecionado);
        return output;
    }
    presentOutput(agendamento, servico) {
        const output = {
            id: agendamento.id,
            clienteId: agendamento.clienteId,
            servico: servico.prop,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status
        };
        return output;
    }
}
exports.CreateAgendamentoUsecase = CreateAgendamentoUsecase;
