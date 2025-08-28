"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdAgendamentoRoute = void 0;
const routes_1 = require("../routes");
class FindByIdAgendamentoRoute {
    path;
    method;
    findByIdAgendamentoService;
    constructor(path, method, findByIdAgendamentoService) {
        this.path = path;
        this.method = method;
        this.findByIdAgendamentoService = findByIdAgendamentoService;
    }
    static create(findByIdAgendamentoService) {
        return new FindByIdAgendamentoRoute("/api/agendamentos/:id", routes_1.HttpMethod.GET, findByIdAgendamentoService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const { id } = request.params;
                const input = { id };
                const result = await this.findByIdAgendamentoService.execute(input);
                response.status(200).json(result);
            }
            catch (error) {
                console.error("Erro na rota findById:", error);
                response.status(500).json({ message: "Erro interno do servidor" });
            }
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.FindByIdAgendamentoRoute = FindByIdAgendamentoRoute;
