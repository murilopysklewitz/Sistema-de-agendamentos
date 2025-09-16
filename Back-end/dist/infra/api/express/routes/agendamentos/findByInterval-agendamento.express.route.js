"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIntervalAgendamentoRoute = void 0;
const routes_1 = require("../routes");
class FindByIntervalAgendamentoRoute {
    path;
    httpMethod;
    findByIntervalAgendamentoService;
    constructor(path, httpMethod, findByIntervalAgendamentoService) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.findByIntervalAgendamentoService = findByIntervalAgendamentoService;
    }
    static create(findByIntervalAgendamentoService) {
        return new FindByIntervalAgendamentoRoute("/api/agendamentos", routes_1.HttpMethod.GET, findByIntervalAgendamentoService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const { data, horaInicio, horaFim } = request.body;
                const agendamentosachados = await this.findByIntervalAgendamentoService.execute({ data, horaInicio, horaFim });
                response.status(200).json(agendamentosachados);
            }
            catch (error) {
                throw new Error("Erro desconhecido no FindByIntervalAgendamentoRoute", error);
            }
        };
    }
    getMethod() {
        return this.httpMethod;
    }
    getPath() {
        return this.path;
    }
}
exports.FindByIntervalAgendamentoRoute = FindByIntervalAgendamentoRoute;
