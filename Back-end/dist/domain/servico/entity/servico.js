"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servico = void 0;
const crypto_1 = require("crypto");
class Servico {
    props;
    constructor(props) {
        this.props = props;
        if (!props.nome || props.nome.trim() === "") {
            throw new Error("Nome do serviço é obrigatório.");
        }
        if (props.preco <= 0) {
            throw new Error("Preço do serviço deve ser positivo.");
        }
        if (props.duracaoEmMinutos <= 0) {
            throw new Error("Duração do serviço deve ser um número positivo.");
        }
    }
    static create(nome, preco, descricao, destaque, duracaoEmMinutos) {
        if (!nome || nome.trim() === "") {
            throw new Error("Nome do serviço não pode ser vazio.");
        }
        if (preco <= 0) {
            throw new Error("Preço do serviço deve ser positivo.");
        }
        if (duracaoEmMinutos <= 0) {
            throw new Error("Duração do serviço deve ser um número positivo.");
        }
        return new Servico({
            id: (0, crypto_1.randomUUID)().toString(),
            nome,
            preco,
            descricao,
            destaque,
            duracaoEmMinutos
        });
    }
    static with(props) {
        return new Servico(props);
    }
    update(novoNome, novoPreco, novaDescricao, novoDestaque, duracaoEmMinutos) {
        if (novoNome !== undefined && novoNome.trim() !== "") {
            this.props.nome = novoNome;
        }
        if (novoPreco !== undefined && novoPreco > 0) {
            this.props.preco = novoPreco;
        }
        if (duracaoEmMinutos !== undefined) {
            if (duracaoEmMinutos == null) {
                this.props.duracaoEmMinutos = 30;
            }
            else if (duracaoEmMinutos > 0) {
                this.props.duracaoEmMinutos = duracaoEmMinutos;
            }
            else {
                throw new Error("Horas de servico não podem ser negativos");
            }
        }
        if (novaDescricao !== undefined) {
            this.props.descricao = novaDescricao;
        }
        if (novoDestaque !== undefined) {
            this.props.destaque = novoDestaque;
        }
    }
    get prop() {
        return this.props;
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
    get duracaoEmMinutos() {
        return this.props.duracaoEmMinutos;
    }
}
exports.Servico = Servico;
