import { Cliente } from "../entity/cliente";

export interface ClienteGateway {
    save(cliente: Cliente): Promise<string>
    list(): Promise<Cliente[]>
    findById(id: string): Promise<Cliente>
    findByEmail(email: string): Promise<Cliente | undefined>
    delete(id: string): Promise<void>
    update(cliente: Cliente): Promise<void> 
}