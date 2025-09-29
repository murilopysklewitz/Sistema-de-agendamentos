"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteUsecase = void 0;
const cliente_1 = require("../../domain/cliente/entity/cliente");
class CreateClienteUsecase {
    clienteGateway;
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new CreateClienteUsecase(clienteGateway);
    }
    async execute({ nome, email, numero, senha }) {
        const aCliente = cliente_1.Cliente.create(nome, email, numero, senha);
        await this.clienteGateway.save(aCliente);
        const output = this.presentOutput(aCliente);
        return output;
    }
    presentOutput(cliente) {
        const output = {
            id: cliente.id
        };
        return output;
    }
}
exports.CreateClienteUsecase = CreateClienteUsecase;
