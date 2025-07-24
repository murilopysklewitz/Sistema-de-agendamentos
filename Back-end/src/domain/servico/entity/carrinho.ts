import { ItemCarrinho, itemCarrinhoProps } from "./item-carrinho"
import { Servico } from "./servico"

export type CarrinhoProps = {
    id:string
    itens: ItemCarrinho[]
}

export class Carrinho {
    private constructor(private readonly props: CarrinhoProps) {
        if(!props.id) {
            throw new Error("O carrinho deve ter um ID")
        }
        this.props.itens = props.itens || []
    }

    public static create(id: string): Carrinho { 
        return new Carrinho({ id, itens: [] });
    }
    
    public static with(props:CarrinhoProps){
        return new Carrinho(props)
    }

    public adicionarServico(servico:Servico, quantidade:number) {
        
        const itemExistente = this.itens.find(itemNoCarrinho => itemNoCarrinho.servico.id === servico.id)
    }

    public get id():string {
        return this.props.id
    }

    public get itens():ItemCarrinho[] {
        return this.props.itens
    }
}