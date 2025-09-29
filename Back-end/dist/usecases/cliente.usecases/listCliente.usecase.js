"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClienteUsecase = void 0;
class ListClienteUsecase {
    clienteGateway;
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new ListClienteUsecase(clienteGateway);
    }
    async execute() {
        const clientes = await this.clienteGateway.list();
        const output = this.presentOutput(clientes);
        return output;
    }
    presentOutput(clientes) {
        return {
            clientes: clientes.map(p => ({
                id: p.id,
                nome: p.nome,
                email: p.email,
                numero: p.numero,
                senha: p.senha
            }))
        };
    }
}
exports.ListClienteUsecase = ListClienteUsecase;
