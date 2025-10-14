"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteUsecase = void 0;
const cliente_1 = require("../../domain/cliente/entity/cliente");
class CreateClienteUsecase {
    clienteGateway;
    passwordHasher;
    constructor(clienteGateway, passwordHasher) {
        this.clienteGateway = clienteGateway;
        this.passwordHasher = passwordHasher;
    }
    static create(clienteGateway, passwordHasher) {
        return new CreateClienteUsecase(clienteGateway, passwordHasher);
    }
    async execute({ nome, email, numero, senha, role }) {
        console.log("Executando CreateClienteUsecase com os seguintes dados:", nome, email, numero, senha, role);
        const existingCliente = await this.clienteGateway.findByEmail(email);
        console.log("ExistingCliente:", existingCliente);
        if (existingCliente) {
            throw new Error("Email já cadastrado");
        }
        if (senha.length < 8) {
            throw new Error("A senha deve ter no mínimo 8 caracteres");
        }
        const hashedPassword = await this.passwordHasher.hash(senha);
        console.log("HashedPassword:", hashedPassword);
        const cliente = cliente_1.Cliente.create(nome, email, numero, hashedPassword, role || cliente_1.ClienteRole.CLIENTE);
        console.log("Cliente criado:", cliente);
        await this.clienteGateway.save(cliente);
        return {
            id: cliente.id,
        };
    }
    presentOutput(cliente) {
        const output = {
            id: cliente.id
        };
        return output;
    }
}
exports.CreateClienteUsecase = CreateClienteUsecase;
