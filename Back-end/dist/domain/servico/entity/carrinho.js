"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrinho = void 0;
class Carrinho {
    props;
    constructor(props) {
        this.props = props;
        if (!props.id) {
            throw new Error("O carrinho deve ter um ID");
        }
        this.props.itens = props.itens || [];
    }
    static create(id) {
        return new Carrinho({ id, itens: [] });
    }
    static with(props) {
        return new Carrinho(props);
    }
}
exports.Carrinho = Carrinho;
