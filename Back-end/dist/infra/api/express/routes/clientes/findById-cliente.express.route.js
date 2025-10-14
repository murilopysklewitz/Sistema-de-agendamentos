"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdClienteRoute = void 0;
const routes_1 = require("../routes");
class FindByIdClienteRoute {
    path;
    method;
    findByIdClientesService;
    constructor(path, method, findByIdClientesService) {
        this.path = path;
        this.method = method;
        this.findByIdClientesService = findByIdClientesService;
    }
    static create(findByIdClientesService) {
        return new FindByIdClienteRoute("/api/clientes/:id", routes_1.HttpMethod.GET, findByIdClientesService);
    }
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            console.log(`Request para achar cliente por id: ${id}`);
            const cliente = await this.findByIdClientesService.execute({ id });
            console.log(`Response body: ${JSON.stringify(cliente)}`);
            response.status(200).json(cliente);
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.FindByIdClienteRoute = FindByIdClienteRoute;
