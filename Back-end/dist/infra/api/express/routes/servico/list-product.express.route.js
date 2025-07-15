"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListServicosRoute = void 0;
const routes_1 = require("../routes");
class ListServicosRoute {
    path;
    method;
    listServicoService;
    constructor(path, method, listServicoService) {
        this.path = path;
        this.method = method;
        this.listServicoService = listServicoService;
    }
    static create(listServicoService) {
        return new ListServicosRoute("/servicos", routes_1.HttpMethod.GET, listServicoService);
    }
    getHandler() {
        return async (request, response) => {
            const output = await this.listServicoService.execute();
            const responseBody = await this.present(output);
            response.status(200).json(responseBody).send();
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
    present(input) {
        const response = {
            servicos: input.servicos.map((servico) => ({
                id: servico.id,
                name: servico.name,
                price: servico.price,
                description: servico.description,
                highlight: servico.highlight,
            }))
        };
        return response;
    }
}
exports.ListServicosRoute = ListServicosRoute;
