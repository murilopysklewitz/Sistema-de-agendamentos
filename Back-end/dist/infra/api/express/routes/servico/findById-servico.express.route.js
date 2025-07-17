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
        return new FindByIdServicoRoute("/servico:id", routes_1.HttpMethod.GET, findByIdServicoService);
    }
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id: id };
            const output = await this.findByIdServicoService.execute(input);
            response.status(200).json(output).send();
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
