"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servico = void 0;
class Servico {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(nome, preco, descricao, destaque, horasDeServico) {
        return new Servico({
            id: crypto.randomUUID().toString(),
            nome,
            preco,
            descricao,
            destaque,
            horasDeServico
        });
    }
    static with(props) {
        return new Servico(props);
    }
    updateDetails(descricao, destaque) {
        if (descricao !== undefined) {
            this.props.descricao = descricao;
        }
        if (destaque !== undefined) {
            this.props.destaque = destaque;
        }
    }
    updatePreco(newPreco) {
        this.props.preco = newPreco;
    }
    get id() {
        return this.props.id;
    }
    get nome() {
        return this.props.nome;
    }
    get preco() {
        return this.props.preco;
    }
    get descricao() {
        return this.props.descricao;
    }
    get destaque() {
        return this.props.destaque;
    }
    get horasDeServico() {
        return this.props.horasDeServico;
    }
}
exports.Servico = Servico;
