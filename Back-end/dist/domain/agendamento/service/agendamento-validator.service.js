"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoValidatorService = void 0;
class AgendamentoValidatorService {
    agendamentoGateway;
    constructor(agendamentoGateway) {
        this.agendamentoGateway = agendamentoGateway;
    }
    async validateNoConflict(agendamento) {
        try {
            const agendamentosConflitantes = await this.agendamentoGateway.findByInterval(agendamento.data, agendamento.horaInicio, agendamento.horaFim);
            const conflitoEncontrado = agendamentosConflitantes.some((conflitante) => agendamento.estaEmConflitoCom(conflitante));
            if (conflitoEncontrado) {
                throw new Error("Já existe um agendamento nesse horario");
            }
        }
        catch (error) {
            throw new Error("houve um erro ao validar conflitos", error);
        }
    }
}
exports.AgendamentoValidatorService = AgendamentoValidatorService;
