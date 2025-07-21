"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteServicoRoute = void 0;
const routes_1 = require("../routes");
class DeleteServicoRoute {
    path;
    method;
    deleteServicoService;
    constructor(path, method, deleteServicoService) {
        this.path = path;
        this.method = method;
        this.deleteServicoService = deleteServicoService;
    }
    static create(deleteServicoService) {
        return new DeleteServicoRoute("/servicos/:id", routes_1.HttpMethod.DELETE, deleteServicoService);
    }
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const input = { id: id };
            await this.deleteServicoService.execute(input);
            response.status(204).send();
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.DeleteServicoRoute = DeleteServicoRoute;
