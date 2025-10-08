import { ClienteRole } from "../../../../domain/cliente/entity/cliente";

export interface IClienteMapper {
    toDomainRole(roleString: string): ClienteRole
}