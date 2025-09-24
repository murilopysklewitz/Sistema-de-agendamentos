"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    props;
    constructor(props) {
        this.props = props;
        if (!props.nome) {
            throw new Error("Um cliente deve ter um nome.");
        }
        if (!props.email) {
            throw new Error("Um cliente deve ter um Email.");
        }
        if (!props.numero) {
            throw new Error("Um cliente deve ter um numero");
        }
    }
    static create(nome, email, numero) {
        if (!nome || nome.trim() === "") {
            throw new Error("Nome inválido");
        }
        if (!email || email.trim() === "") {
            throw new Error("Email inválido");
        }
        if (!numero || nome.trim() === "") {
            throw new Error("Numero inválido");
        }
        return new Cliente({
            id: crypto.randomUUID().toString(),
            nome,
            email,
            numero
        });
    }
    static with(props) {
        return new Cliente(props);
    }
    updateNome(novoNome) {
        if (!novoNome || novoNome.trim() === "") {
            throw new Error("Novo nome do cliente não pode ser vazio.");
        }
        this.props.nome = novoNome;
    }
    updateEmail(novoEmail) {
        if (!novoEmail || !this.isValidEmail(novoEmail)) {
            throw new Error("Novo email do cliente inválido.");
        }
        this.props.email = novoEmail;
    }
    updateNumber(novoNumero) {
        if (!novoNumero) {
            throw new Error("Novo numero inválido");
        }
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    get id() { return this.props.id; }
    get nome() { return this.props.nome; }
    get email() { return this.props.email; }
    get numero() { return this.props.numero; }
}
exports.Cliente = Cliente;
