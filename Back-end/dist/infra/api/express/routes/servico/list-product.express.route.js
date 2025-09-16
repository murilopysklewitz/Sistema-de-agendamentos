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
        return new ListServicosRoute("/api/servicos", routes_1.HttpMethod.GET, listServicoService);
    }
    getHandler() {
        return async (request, response) => {
            const output = await this.listServicoService.execute();
            const responseBody = this.present(output);
            response.status(200).json(responseBody);
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
                nome: servico.nome,
                preco: servico.preco,
                descricao: servico.descricao,
                destaque: servico.destaque,
                duracaoEmMinutos: servico.duracaoEmMinutos
            }))
        };
        return response;
    }
}
exports.ListServicosRoute = ListServicosRoute;
