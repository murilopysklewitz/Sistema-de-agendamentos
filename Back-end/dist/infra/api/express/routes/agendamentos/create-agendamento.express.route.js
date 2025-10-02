"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgendamentoRoute = void 0;
const routes_1 = require("../routes");
class CreateAgendamentoRoute {
    path;
    method;
    createAgendamentoService;
    middlewares = [];
    constructor(path, method, createAgendamentoService, middlewares = []) {
        this.path = path;
        this.method = method;
        this.createAgendamentoService = createAgendamentoService;
        this.middlewares = middlewares;
    }
    static create(createAgendamentoService, middlewares = []) {
        return new CreateAgendamentoRoute('/api/agendamentos', routes_1.HttpMethod.POST, createAgendamentoService, middlewares);
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
    getMiddlewares() {
        return this.middlewares;
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
