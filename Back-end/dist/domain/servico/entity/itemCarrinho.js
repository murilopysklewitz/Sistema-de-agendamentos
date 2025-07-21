"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemCarrinho = void 0;
class itemCarrinho {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(servico, quantidade) {
        return new itemCarrinho({
            servico, quantidade
        });
    }
    static with(props) {
        return new itemCarrinho(props);
    }
    get servico() {
        return this.props.servico;
    }
    get quantidade() {
        return this.props.quantidade;
    }
    updateQuantidade(novaQuantidade) {
        if (novaQuantidade <= 0) {
            throw new Error("A nova quantidade deve ser maior que zero.");
        }
        this.props.quantidade = novaQuantidade;
    }
    get subtotal() {
        return this.props.servico.preco * this.props.quantidade;
    }
}
exports.itemCarrinho = itemCarrinho;
