"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteMapper = exports.ClienteMapper = void 0;
const cliente_1 = require("../../../../domain/cliente/entity/cliente");
class ClienteMapper {
    toDomainRole(roleString) {
        switch (roleString) {
            case "admin":
                return cliente_1.ClienteRole.ADMIN;
            case "cliente":
                return cliente_1.ClienteRole.CLIENTE;
            default:
                throw new Error(`Role inválido encontrado no banco: ${roleString}`);
        }
    }
}
exports.ClienteMapper = ClienteMapper;
exports.clienteMapper = new ClienteMapper();
