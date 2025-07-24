import { Carrinho } from "../entity/carrinho";


export interface CarrinhoGateway {
    save(carrinho: Carrinho): Promise<void>
    findById(id: string): Promise<Carrinho | null>;
    delete(id:string): Promise<void>
    list(): Promise<Carrinho[]>
}