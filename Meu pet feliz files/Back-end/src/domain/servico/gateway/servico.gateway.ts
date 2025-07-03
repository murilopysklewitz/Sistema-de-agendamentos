import { Servico } from "../entity/servico";

export interface ServicoGateway {
    save(servico: Servico): Promise<void>;
    list(): Promise<Servico[]>;
}