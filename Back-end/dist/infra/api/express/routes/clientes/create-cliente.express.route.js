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
        return new CreateClienteRoute("/api/clientes", routes_1.HttpMethod.POST, createClienteService);
    }
    getHandler() {
        return async (request, response) => {
            console.log("Request body:");
            console.log(request.body);
            const { nome, email, numero, senha, role } = request.body;
            const input = {
                nome, email, numero, senha, role
            };
            console.log("Input to CreateClienteUsecase:");
            console.log(input);
            const output = await this.createClienteService.execute(input);
            console.log("Output from CreateClienteUsecase:");
            console.log(output);
            const responseBody = this.present(output);
            console.log("Response body:");
            console.log(responseBody);
            response.status(201).json(responseBody);
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
