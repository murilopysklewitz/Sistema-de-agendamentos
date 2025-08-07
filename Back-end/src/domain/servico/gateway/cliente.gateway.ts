import { Cliente } from "../entity/cliente";

export interface ClienteGateway {
    save(cliente: Cliente): Promise<void>
    list(): Promise<Cliente[]>
    findById(id: string): Promise<Cliente>
    delete(id: string): Promise<void>
    update(cliente: Cliente): Promise<void> 
}