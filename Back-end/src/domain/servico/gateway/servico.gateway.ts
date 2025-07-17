import { Servico } from "../entity/servico";

export interface ServicoGateway {
    save(servico: Servico): Promise<void>;
    list(): Promise<Servico[]>;
    findById(id: string): Promise<Servico | null>;
    delete(id: string): Promise<void>;
    update(servico:Servico): Promise<void>;
}