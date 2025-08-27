"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdServicoRoute = void 0;
const routes_1 = require("../routes");
class FindByIdServicoRoute {
    path;
    httpMethod;
    findByIdServicoService;
    constructor(path, httpMethod, findByIdServicoService) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.findByIdServicoService = findByIdServicoService;
    }
    static create(findByIdServicoService) {
        return new FindByIdServicoRoute("/servicos/:id", routes_1.HttpMethod.GET, findByIdServicoService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                const { id } = request.params;
                const input = { id };
                const result = await this.findByIdServicoService.execute(input);
                if (!result) {
                    response.status(404).json({ message: "Serviço não encontrado" });
                }
                response.status(200).json(result);
            }
            catch (error) {
                console.error("Erro na rota findById:", error);
                response.status(500).json({ message: "Erro interno do servidor" });
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
exports.FindByIdServicoRoute = FindByIdServicoRoute;
