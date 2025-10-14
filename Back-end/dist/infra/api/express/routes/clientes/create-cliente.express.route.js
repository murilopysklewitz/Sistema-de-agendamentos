"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteRoute = void 0;
const routes_1 = require("../routes");
class CreateClienteRoute {
    path;
    httpMethod;
    createClienteService;
    middlewares;
    constructor(path, httpMethod, createClienteService, middlewares = []) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.createClienteService = createClienteService;
        this.middlewares = middlewares;
    }
    static create(createClienteService, middlewares = []) {
        return new CreateClienteRoute("/api/clientes", routes_1.HttpMethod.POST, createClienteService, middlewares);
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
    getMiddlewares() {
        return this.middlewares;
    }
}
exports.CreateClienteRoute = CreateClienteRoute;
