"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgendamentoUsecase = void 0;
const agendamento_1 = require("../../../domain/agendamento/entity/agendamento");
class CreateAgendamentoUsecase {
    agendamentoGateway;
    agendamentoValidator;
    servicoGateway;
    clienteGateway;
    constructor(agendamentoGateway, agendamentoValidator, servicoGateway, clienteGateway) {
        this.agendamentoGateway = agendamentoGateway;
        this.agendamentoValidator = agendamentoValidator;
        this.servicoGateway = servicoGateway;
        this.clienteGateway = clienteGateway;
    }
    static create(agendamentoGateway, agendamentoValidator, servicoGateway, ClienteGateway) {
        return new CreateAgendamentoUsecase(agendamentoGateway, agendamentoValidator, servicoGateway, ClienteGateway);
    }
    async execute({ clienteId, servicoId, data, horaInicio }) {
        const cliente = await this.clienteGateway.findById(clienteId);
        if (!cliente) {
            throw new Error("Cliente com id não encontrado");
        }
        const servicoSelecionado = await this.servicoGateway.findById(servicoId);
        if (!servicoSelecionado) {
            throw new Error("Serviço com id não encontrado");
        }
        const aAgendamento = agendamento_1.Agendamento.create(cliente, servicoSelecionado, data, horaInicio);
        try {
            await this.agendamentoValidator.validateAll(aAgendamento);
        }
        catch (error) {
            throw new Error(`Não foi possivel criar um agendamento, conflito de horário ${error}`);
        }
        await this.agendamentoGateway.save(aAgendamento);
        const output = this.presentOutput(aAgendamento);
        return output;
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
exports.CreateAgendamentoUsecase = CreateAgendamentoUsecase;
