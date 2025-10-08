import { ClienteRole } from "../../../../domain/cliente/entity/cliente";
import { IClienteMapper } from "./cliente.mapper.interface";

export class ClienteMapper implements IClienteMapper {
    public toDomainRole(roleString: string): ClienteRole {
        switch (roleString) {
          case "admin":
            return ClienteRole.ADMIN;
          case "cliente":
            return ClienteRole.CLIENTE;
          default:
            throw new Error(`Role inválido encontrado no banco: ${roleString}`);
        }
      }
}
export const clienteMapper = new ClienteMapper();