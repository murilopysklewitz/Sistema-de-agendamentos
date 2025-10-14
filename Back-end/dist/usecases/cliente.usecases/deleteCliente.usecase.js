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
        console.log(`Executando DeleteClienteUsecase com id: ${id}`);
        const cliente = await this.clienteGateway.findById(id);
        console.log(`cliente achado com id: ${id}`, cliente);
        if (!cliente) {
            throw new Error(`Cliente com id: ${id} não encontrado`);
        }
        await this.clienteGateway.delete(cliente.id);
        console.log(`cliente deletado com id: ${id}`);
    }
}
exports.DeleteClienteUsecase = DeleteClienteUsecase;
