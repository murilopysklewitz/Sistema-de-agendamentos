import { itemCarrinho, itemCarrinhoProps } from "./itemCarrinho"

export type CarrinhoProps = {
    id:string
    itens: itemCarrinho[]
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
}