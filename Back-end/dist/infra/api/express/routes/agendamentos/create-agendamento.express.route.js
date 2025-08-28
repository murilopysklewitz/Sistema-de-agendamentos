"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgendamentoRoute = void 0;
const routes_1 = require("../routes");
class CreateAgendamentoRoute {
    path;
    method;
    createAgendamentoService;
    constructor(path, method, createAgendamentoService) {
        this.path = path;
        this.method = method;
        this.createAgendamentoService = createAgendamentoService;
    }
    static create(createAgendamentoService) {
        return new CreateAgendamentoRoute('/api/agendamentos', routes_1.HttpMethod.POST, createAgendamentoService);
    }
    getHandler() {
        return async (request, response) => {
            const { clienteId, servico, data, horaInicio, } = request.body;
            const input = {
                clienteId, servico, data, horaInicio
            };
            const output = await this.createAgendamentoService.execute(input);
            const responseBody = this.present(output);
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(input) {
        const response = {
            id: input.id,
            clienteId: input.clienteId,
            servico: input.servico,
            status: input.status,
            data: input.data,
            horaInicio: input.horaInicio,
            horaFim: input.horaFim,
        };
        return response;
    }
}
exports.CreateAgendamentoRoute = CreateAgendamentoRoute;
