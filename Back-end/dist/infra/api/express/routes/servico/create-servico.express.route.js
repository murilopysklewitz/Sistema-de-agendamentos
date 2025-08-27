"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicoRoute = void 0;
const routes_1 = require("../routes");
class CreateServicoRoute {
    path;
    method;
    createServicoService;
    constructor(path, method, createServicoService) {
        this.path = path;
        this.method = method;
        this.createServicoService = createServicoService;
    }
    static create(createServicoService) {
        return new CreateServicoRoute("/servicos", routes_1.HttpMethod.POST, createServicoService);
    }
    getHandler() {
        return async (request, response) => {
            const { nome, preco, descricao, destaque, duracaoEmMinutos } = request.body;
            const input = {
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos
            };
            const output = await this.createServicoService.execute(input);
            const responseBody = this.present(output);
            response.status(201).json(responseBody).send();
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(input) {
        const response = { id: input.id };
        return response;
    }
}
exports.CreateServicoRoute = CreateServicoRoute;
