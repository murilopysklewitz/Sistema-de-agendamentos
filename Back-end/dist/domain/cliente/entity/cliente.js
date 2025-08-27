"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    props;
    constructor(props) {
        this.props = props;
        if (!props.id) {
            throw new Error("Um cliente deve haver ID.");
        }
        if (!props.nome) {
            throw new Error("Um cliente deve ter um nome.");
        }
        if (!props.email) {
            throw new Error("Um cliente deve ter um Email.");
        }
    }
    static create(nome, email) {
        if (!nome || nome.trim() === "") {
            throw new Error("Nome inválido");
        }
        if (!email || email.trim() === "") {
            throw new Error("Email inválido");
        }
        return new Cliente({
            id: crypto.randomUUID().toString(),
            nome,
            email
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
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    get id() { return this.props.id; }
    get nome() { return this.props.nome; }
    get email() { return this.props.email; }
}
exports.Cliente = Cliente;
