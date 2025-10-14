"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicoRoute = void 0;
const routes_1 = require("../routes");
class CreateServicoRoute {
    path;
    method;
    createServicoService;
    middlewares = [];
    constructor(path, method, createServicoService, middlewares = []) {
        this.path = path;
        this.method = method;
        this.createServicoService = createServicoService;
        this.middlewares = middlewares;
    }
    static create(createServicoService, middlewares = []) {
        return new CreateServicoRoute("/api/servicos", routes_1.HttpMethod.POST, createServicoService, middlewares);
    }
    getHandler() {
        return async (request, response) => {
            console.log("Request para criar servico:", JSON.stringify(request.body));
            const { nome, preco, descricao, destaque, duracaoEmMinutos } = request.body;
            const input = {
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos
            };
            console.log("Input para criar servico:", JSON.stringify(input));
            const output = await this.createServicoService.execute(input);
            console.log("Output para criar servico:", JSON.stringify(output));
            const responseBody = this.present(output);
            console.log("Response body:", JSON.stringify(responseBody));
            response.status(201).json(responseBody);
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    getMiddlewares() {
        return this.middlewares;
    }
    present(input) {
        const response = { id: input.id };
        return response;
    }
}
exports.CreateServicoRoute = CreateServicoRoute;
