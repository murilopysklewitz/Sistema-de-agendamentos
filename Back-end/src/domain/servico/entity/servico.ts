import { randomUUID } from "crypto";

export type ServicoProps = {
    id:string;
    nome:string;
    preco:number;
    descricao:string | null;
    destaque: boolean;
    duracaoEmMinutos: number
}
export class Servico {
    private constructor(private props: ServicoProps) {
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
    
    public static create (
        nome:string, 
        preco:number, 
        descricao:string | null, 
        destaque:boolean, 
        duracaoEmMinutos:number
    ): Servico {
        if (!nome || nome.trim() === "") {
            throw new Error("Nome do serviço não pode ser vazio.");
        }
        if (preco <= 0) {
            throw new Error("Preço do serviço deve ser positivo.");
        }
        if (duracaoEmMinutos <= 0) { 
            throw new Error("Duração do serviço deve ser um número positivo.");
        }

        return new Servico ({
            id: randomUUID().toString(),
            nome,
            preco,
            descricao,
            destaque,
            duracaoEmMinutos
        });
    }

    public static with(props: ServicoProps) {
        return new Servico(props);
    }

    public update(  novoNome?: string, 
                    novoPreco?: number, 
                    novaDescricao?: string | null, 
                    novoDestaque?: boolean, 
                    duracaoEmMinutos?: number |  null
                ): void {

        if (novoNome !== undefined && novoNome.trim() !== "") {this.props.nome = novoNome}

        if (novoPreco !== undefined && novoPreco > 0) {this.props.preco = novoPreco}

        if (    duracaoEmMinutos !== undefined ) {
            if (    duracaoEmMinutos == null) {
                this.props.duracaoEmMinutos = 30;

            }else if (  duracaoEmMinutos > 0) {
                this.props.duracaoEmMinutos =  duracaoEmMinutos;

            }else {
                throw new Error("Horas de servico não podem ser negativos")
            }
        }

        if(novaDescricao !== undefined) {this.props.descricao = novaDescricao}

        if(novoDestaque !== undefined) {this.props.destaque = novoDestaque}
    }

    public get prop(): ServicoProps {
        return this.props
    }
    public get id() {
        return this.props.id;
    }
    public get nome() {
        return this.props.nome;
    }

    public get preco() {
        return this.props.preco;
    }

    public get descricao() {
        return this.props.descricao;
    }
    public get destaque () {
        return this.props.destaque;
    }
    public  get duracaoEmMinutos() {
        return this.props.duracaoEmMinutos
    }


}