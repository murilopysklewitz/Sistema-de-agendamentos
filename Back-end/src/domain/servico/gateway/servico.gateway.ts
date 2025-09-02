import { Servico } from "../entity/servico";

export interface ServicoGateway {
    save(servico: Servico): Promise<string>;
    list(): Promise<Servico[]>;
    findById(id: string): Promise<Servico>;
    delete(id: string): Promise<void>;
    update(servico:Servico): Promise<void>;
}