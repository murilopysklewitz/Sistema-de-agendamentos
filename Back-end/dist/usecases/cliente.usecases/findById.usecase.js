"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdClienteUsecase = void 0;
const cliente_1 = require("../../domain/cliente/entity/cliente");
class FindByIdClienteUsecase {
    clienteGateway;
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new FindByIdClienteUsecase(clienteGateway);
    }
    async execute({ id }) {
        const aCliente = await this.clienteGateway.findById(id);
        const output = this.presentOutput(aCliente);
        return output;
    }
    presentOutput(cliente) {
        return {
            cliente: cliente_1.Cliente.with({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
            })
        };
    }
}
exports.FindByIdClienteUsecase = FindByIdClienteUsecase;
