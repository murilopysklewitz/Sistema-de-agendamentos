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
        return new FindByIntervalAgendamentoRoute("/api/agendamentos/date", routes_1.HttpMethod.GET, findByIntervalAgendamentoService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const { data } = request.query;
                if (!data) {
                    response.status(400).json({
                        error: "Parâmetro 'data' é obrigatório (formato: YYYY-MM-DD)"
                    });
                    return;
                }
                const dataDate = new Date(data);
                if (isNaN(dataDate.getTime())) {
                    response.status(400).json({
                        error: "Data inválida. Use formato: YYYY-MM-DD"
                    });
                    return;
                }
                console.log(`Buscando agendamentos para data: ${dataDate.toISOString()}`);
                const agendamentosAchados = await this.findByIntervalAgendamentoService.execute({
                    data: dataDate
                });
                response.status(200).json(agendamentosAchados);
            }
            catch (error) {
                console.error(`Erro: ${error.message}`);
                response.status(500).json({ error: error.message });
            }
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.httpMethod;
    }
}
exports.FindByIntervalAgendamentoRoute = FindByIntervalAgendamentoRoute;
