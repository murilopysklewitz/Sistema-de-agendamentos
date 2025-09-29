import { Agendamento } from "../../agendamento/entity/agendamento";

export type ClienteProps = {
    id: string;
    nome: string;
    email: string;
    numero: string;
    senha: string
}

export class Cliente {
    private constructor(private readonly props: ClienteProps) { 
        if (!props.nome) {
            throw new Error("Um cliente deve ter um nome.")
        }
        if(!props.email) {
            throw new Error("Um cliente deve ter um Email.")
        }
        if(!props.numero) {
            throw new Error ("Um cliente deve ter um numero")
        }
        if(!props.senha) {
            throw new Error("Um cliente deve ter umas senha")
        }
    }

    public static create(nome: string, email: string, numero: string, senha: string) {
        if(!nome || nome.trim() === "") {
            throw new Error("Nome inválido")
        }
        if(!email || email.trim() === "") {
            throw new Error("Email inválido")
        }
        if(!numero || nome.trim() === "") {
            throw new Error("Numero inválido")
        }
        if(!senha || senha.trim() === ""){
            throw new Error("Senha inválida")
        }

        return new Cliente({
            id: crypto.randomUUID().toString(),
            nome,
            email,
            numero,
            senha
        })
    }

    public static with(props:ClienteProps): Cliente {
        return new Cliente(props)
    }

    public updateNome(novoNome: string): void {
        if (!novoNome || novoNome.trim() === "") {
            throw new Error("Novo nome do cliente não pode ser vazio.");
        }
        this.props.nome = novoNome;
    }

    public updateEmail(novoEmail: string): void {
        if (!novoEmail || !this.isValidEmail(novoEmail)) {
            throw new Error("Novo email do cliente inválido.");
        }
        this.props.email = novoEmail;
    }

    public updateNumber(novoNumero: string): void {
        if(!novoNumero) {
            throw new Error("Novo numero inválido");
        }
        this.props.numero = novoNumero;
    }

    public updateSenha(novaSenha: string): void {
        if(!novaSenha){
            throw new Error ("Nova senha inválida");
        }
        this.props.senha = novaSenha;
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public get id(): string { return this.props.id; }
    public get nome(): string { return this.props.nome; }
    public get email(): string { return this.props.email; }
    public get numero(): string { return this.props.numero; }
    public get senha(): string { return this.props.senha; }
}