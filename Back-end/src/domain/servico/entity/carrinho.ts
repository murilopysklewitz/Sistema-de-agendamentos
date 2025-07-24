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

    public adicionarServicoNoCarrinho(servico:Servico, quantidade:number) {
        
        const itemExistente = this.itens.find(itemNoCarrinho => itemNoCarrinho.servico.id === servico.id)
        if (quantidade <= 0) {
            throw new Error("deve haver pelo menos uma quantidade do serviço escolhido")
        }
        if (itemExistente) {
            itemExistente.updateQuantidade(itemExistente.quantidade + quantidade)
        }else {
            const novoItem = ItemCarrinho.create(servico, quantidade)
            this.itens.push(novoItem)
        }
    }

    public deletarServicoDoCarrinho(servicoId:string) {
        const quantidadeItensAntes = this.props.itens.length
        const novoArrayItens = this.itens.filter(itemNoCarrinho => itemNoCarrinho.servico.id !== servicoId)

        this.props.itens = novoArrayItens

        if (novoArrayItens.length == quantidadeItensAntes) {
            throw new Error(`Servico com id ${servicoId} não foi encontrado no carrinho`)
        }
    }


    public get id():string {
        return this.props.id
    }

    public get itens():ItemCarrinho[] {
        return [...this.props.itens]
    }
}