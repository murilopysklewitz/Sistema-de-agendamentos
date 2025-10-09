"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByEmailClienteUsecase = void 0;
const cliente_1 = require("../../domain/cliente/entity/cliente");
class FindByEmailClienteUsecase {
    clienteGateway;
    constructor(clienteGateway) {
        this.clienteGateway = clienteGateway;
    }
    static create(clienteGateway) {
        return new FindByEmailClienteUsecase(clienteGateway);
    }
    async execute({ email }) {
        try {
            const cliente = await this.clienteGateway.findByEmail(email);
            const output = this.presentOutput(cliente);
            return output;
        }
        catch (error) {
            throw new Error("não foi possível achar cliente com esse email");
        }
    }
    presentOutput(cliente) {
        return {
            cliente: cliente_1.Cliente.with({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
                senha: cliente.senha,
                role: cliente.role
            })
        };
    }
}
exports.FindByEmailClienteUsecase = FindByEmailClienteUsecase;
