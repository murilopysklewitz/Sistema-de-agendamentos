import { Servico } from "./servico"

export type itemCarrinhoProps = {
    servico: Servico,
    quantidade: number
}

export class ItemCarrinho {
    private constructor(private readonly props:itemCarrinhoProps) {}

    public static create(servico: Servico, quantidade: number): ItemCarrinho {
        return new ItemCarrinho({
            servico, quantidade
        })
    }
    public static with(props:itemCarrinhoProps){
        return new ItemCarrinho(props)
    }
    public get servico(): Servico {
        return this.props.servico;
    }

    public get quantidade(): number {
        return this.props.quantidade;
    }


    public updateQuantidade(novaQuantidade: number): void {
        if (novaQuantidade <= 0) {
            throw new Error("A nova quantidade deve ser maior que zero.");
        }
        this.props.quantidade = novaQuantidade;
    }


    public get subtotal(): number {
        return this.props.servico.preco * this.props.quantidade;
    }
}