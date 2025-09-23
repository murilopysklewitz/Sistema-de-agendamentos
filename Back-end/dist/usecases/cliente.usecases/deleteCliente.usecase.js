"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClienteUsecase = void 0;
class DeleteClienteUsecase {
    clienteGateway;
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new DeleteClienteUsecase(clienteGateway);
    }
    async execute({ id }) {
        const cliente = await this.clienteGateway.findById(id);
        await this.clienteGateway.delete(cliente.id);
    }
}
exports.DeleteClienteUsecase = DeleteClienteUsecase;
