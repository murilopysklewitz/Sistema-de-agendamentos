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
            const { clienteId, servicoId, data, horaInicio, } = request.body;
            const input = {
                clienteId,
                servicoId,
                data: new Date(data),
                horaInicio: new Date(horaInicio)
            };
            const output = await this.createAgendamentoService.execute(input);
            const responseBody = this.present(output);
            response.status(201).json(responseBody);
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
            servicoId: input.servicoId,
            status: input.status,
            data: input.data,
            horaInicio: input.horaInicio,
            horaFim: input.horaFim,
        };
        return response;
    }
}
exports.CreateAgendamentoRoute = CreateAgendamentoRoute;
