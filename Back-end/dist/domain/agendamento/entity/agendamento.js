"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agendamento = exports.businessHours = void 0;
const crypto_1 = require("crypto");
exports.businessHours = {
    startHour: 9,
    endHour: 18
};
class Agendamento {
    props;
    static validAgendamentoStatus = ['CONFIRMADO', 'CONCLUIDO', 'AGENDADO', 'CANCELADO'];
    static isValidStatus(status) {
        return this.validAgendamentoStatus.includes(status);
    }
    constructor(props) {
        this.props = props;
        const startHour = props.horaInicio.getHours();
        const endHour = props.horaFim.getHours();
        if (startHour < exports.businessHours.startHour || endHour > exports.businessHours.endHour) {
            throw new Error(`Agendamento fora do horário de funcionamento (${exports.businessHours.startHour}h até ${exports.businessHours.endHour}h)`);
        }
        if (!Agendamento.isValidStatus(props.status)) {
            throw new Error(`Status de agendamento inválido: ${props.status}`);
        }
        if (!props.id)
            throw new Error("Agendamento deve ter um ID.");
        if (!props.servico)
            throw new Error("Agendamento deve ter um serviço.");
        if (!props.cliente)
            throw new Error("Agendamento deve ter um cliente.");
        if (!props.data)
            throw new Error("Agendamento deve ter uma data.");
        if (!props.horaInicio)
            throw new Error("Agendamento deve ter uma hora de início.");
        if (!props.horaFim)
            throw new Error("Agendamento deve ter uma hora de fim.");
        if (props.horaInicio >= props.horaFim) {
            throw new Error("Hora de início deve ser anterior à hora de fim.");
        }
    }
    static create(cliente, servico, data, horaInicio) {
        const horaFim = new Date(horaInicio.getTime() + servico.duracaoEmMinutos * 60 * 1000);
        return new Agendamento({
            id: (0, crypto_1.randomUUID)().toString(),
            cliente,
            servico,
            data,
            horaInicio,
            horaFim,
            status: 'AGENDADO',
            createdAt: new Date,
            updatedAt: new Date
        });
    }
    static with(props) {
        return new Agendamento(props);
    }
    get id() { return this.props.id; }
    get servico() { return this.props.servico; }
    get cliente() { return this.props.cliente; }
    get data() { return this.props.data; }
    get horaInicio() { return this.props.horaInicio; }
    get horaFim() { return this.props.horaFim; }
    get status() { return this.props.status; }
    estaEmConflitoCom(outroAgendamento) {
        const mesmoDia = this.data.toDateString() === outroAgendamento.data.toDateString();
        if (!mesmoDia) {
            return false;
        }
        const sobreposicao = this.horaInicio < outroAgendamento.horaFim &&
            this.horaFim > outroAgendamento.horaInicio;
        return sobreposicao;
    }
    cancelar() {
        if (this.props.status === "CONCLUIDO") {
            throw new Error("Não se pode cancelar um agendamento já concluido");
        }
        this.props.status = 'CANCELADO';
        this.props.updatedAt = new Date();
    }
    confirmar() {
        if (this.props.status !== 'AGENDADO') {
            throw new Error("Não é possível confirmar um agendamento que não esteja agendado");
        }
        this.props.status = 'CONFIRMADO';
        this.props.updatedAt = new Date();
    }
}
exports.Agendamento = Agendamento;
