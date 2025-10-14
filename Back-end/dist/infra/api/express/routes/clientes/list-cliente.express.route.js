"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClienteRoute = void 0;
const routes_1 = require("../routes");
class ListClienteRoute {
    path;
    method;
    listClienteService;
    constructor(path, method, listClienteService) {
        this.path = path;
        this.method = method;
        this.listClienteService = listClienteService;
    }
    static create(listClienteService) {
        return new ListClienteRoute("/api/clientes", routes_1.HttpMethod.GET, listClienteService);
    }
    getHandler() {
        return async (request, response) => {
            console.log(`Request body: ${JSON.stringify(request.body)}`);
            console.log(`Request params: ${JSON.stringify(request.params)}`);
            console.log(`Request listar clientes`);
            const output = await this.listClienteService.execute();
            console.log(`Response body: ${JSON.stringify(output)}`);
            response.status(200).json(this.present(output));
        };
    }
    present(input) {
        return {
            clientes: input.clientes.map((cliente) => ({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
                role: cliente.role
            }))
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.ListClienteRoute = ListClienteRoute;
