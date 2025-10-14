"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoValidatorService = exports.businessHours = void 0;
exports.businessHours = {
    startHour: 9,
    endHour: 18
};
class AgendamentoValidatorService {
    agendamentoGateway;
    constructor(agendamentoGateway) {
        this.agendamentoGateway = agendamentoGateway;
        console.log("AgendamentoValidatorService constructor called");
    }
    static create(agendamentoGateway) {
        return new AgendamentoValidatorService(agendamentoGateway);
    }
    async validateAll(agendamento) {
        await this.validateNoConflict(agendamento);
    }
    async validateNoConflict(agendamento) {
        try {
            const agendamentosDoDia = await this.agendamentoGateway.findByInterval(agendamento.data);
            const conflitoEncontrado = agendamentosDoDia.some((existente) => agendamento.estaEmConflitoCom(existente));
            if (conflitoEncontrado) {
                throw new Error("Já existe um agendamento nesse horário");
            }
        }
        catch (error) {
            if (error.message.includes("Já existe")) {
                throw error;
            }
            throw new Error(`Erro ao validar conflitos: ${error.message}`);
        }
    }
}
exports.AgendamentoValidatorService = AgendamentoValidatorService;
