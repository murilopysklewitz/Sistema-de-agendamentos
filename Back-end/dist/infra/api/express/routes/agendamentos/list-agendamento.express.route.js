"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAgendamentoRoute = void 0;
const routes_1 = require("../routes");
class ListAgendamentoRoute {
    path;
    method;
    listAgendamentoService;
    constructor(path, method, listAgendamentoService) {
        this.path = path;
        this.method = method;
        this.listAgendamentoService = listAgendamentoService;
    }
    static create(listAgendamentoService) {
        return new ListAgendamentoRoute("/api/agendamentos", routes_1.HttpMethod.GET, listAgendamentoService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const result = await this.listAgendamentoService.execute();
                response.status(200).json(result);
            }
            catch (error) {
                throw new Error("erro na rota listAgendamento");
            }
        };
    }
    getMethod() {
        return this.method;
    }
    getPath() {
        return this.path;
    }
}
exports.ListAgendamentoRoute = ListAgendamentoRoute;
