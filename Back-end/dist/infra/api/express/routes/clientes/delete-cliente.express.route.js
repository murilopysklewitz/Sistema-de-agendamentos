"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClienteRoute = void 0;
const routes_1 = require("../routes");
class DeleteClienteRoute {
    path;
    method;
    deleteClienteService;
    constructor(path, method, deleteClienteService) {
        this.path = path;
        this.method = method;
        this.deleteClienteService = deleteClienteService;
    }
    static create(deleteClienteService) {
        return new DeleteClienteRoute("/api/clientes/:id", routes_1.HttpMethod.DELETE, deleteClienteService);
    }
    getHandler() {
        return async (request, response) => {
            console.log(`Request to delete cliente with id ${request.params.id}`);
            const { id } = request.params;
            console.log(`Deleting cliente with id ${id}`);
            const deleteCliente = await this.deleteClienteService.execute({ id });
            console.log(`Deleted cliente with id ${id}`);
            response.status(204).send();
        };
    }
    getMethod() {
        return this.method;
    }
    getPath() {
        return this.path;
    }
}
exports.DeleteClienteRoute = DeleteClienteRoute;
