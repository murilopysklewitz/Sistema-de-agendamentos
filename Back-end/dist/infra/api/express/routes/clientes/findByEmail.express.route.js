"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByEmailClienteRoute = void 0;
const routes_1 = require("../routes");
class FindByEmailClienteRoute {
    path;
    method;
    findByEmailClientesService;
    constructor(path, method, findByEmailClientesService) {
        this.path = path;
        this.method = method;
        this.findByEmailClientesService = findByEmailClientesService;
    }
    static create(findByEmailClientesService) {
        return new FindByEmailClienteRoute("/api/clientes/:email", routes_1.HttpMethod.GET, findByEmailClientesService);
    }
    getHandler() {
        return async (request, response) => {
            console.log(`Request body: ${JSON.stringify(request.body)}`);
            console.log(`Request params: ${JSON.stringify(request.params)}`);
            const { email } = request.params;
            console.log(`Request para achar cliente ${email}`);
            const cliente = await this.findByEmailClientesService.execute({ email });
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
exports.FindByEmailClienteRoute = FindByEmailClienteRoute;
