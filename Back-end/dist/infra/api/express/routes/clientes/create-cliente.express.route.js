"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteRoute = void 0;
const routes_1 = require("../routes");
class CreateClienteRoute {
    path;
    httpMethod;
    createClienteService;
    constructor(path, httpMethod, createClienteService) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.createClienteService = createClienteService;
    }
    static create(createClienteService) {
        return new CreateClienteRoute("/api/cliente", routes_1.HttpMethod.POST, createClienteService);
    }
    getHandler() {
        return async (request, response) => {
            const { nome, email, numero } = request.body;
            const input = {
                nome, email, numero
            };
            const output = await this.createClienteService.execute(input);
            const responseBody = this.present(output);
            response.status(204).json(responseBody);
        };
    }
    present(input) {
        const response = { id: input.id };
        return response;
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.httpMethod;
    }
}
exports.CreateClienteRoute = CreateClienteRoute;
