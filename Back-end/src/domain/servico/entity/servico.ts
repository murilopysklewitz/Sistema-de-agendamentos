export type ServicoProps = {
    id:string;
    nome:string;
    preco:number;
    descricao:string | null;
    destaque: boolean;
    horasDeServico: number | null
}
export class Servico {
    private constructor(private props: ServicoProps) {

    }
    
    public static create (  nome:string, 
                            preco:number, 
                            descricao:string, 
                            destaque:boolean, 
                            horasDeServico:number) {

        return new Servico ({
            id:crypto.randomUUID().toString(),
            nome,
            preco,
            descricao,
            destaque,
            horasDeServico
        });
    }

    public static with(props: ServicoProps) {
        return new Servico(props);
    }

    public update(   novoNome?: string, 
                            novoPreco?: number, 
                            novaDescricao?: string | null, 
                            novoDestaque?: boolean, 
                            novaHorasDeServico?: number |  null
                ): void {

        if (novoNome !== undefined && novoNome.trim() !== "") {this.props.nome = novoNome}

        if (novoPreco !== undefined && novoPreco > 0) {this.props.preco = novoPreco}

        if (novaHorasDeServico !== undefined ) {
            if (novaHorasDeServico == null) {
                this.props.horasDeServico = null;
            }else if (novaHorasDeServico > 0) {
                this.props.horasDeServico = novaHorasDeServico;
            }else {
                throw new Error("Horas de servico não podem ser negativos")
            }
        }

        if(novaDescricao !== undefined) {this.props.descricao = novaDescricao}

        if(novoDestaque !== undefined) {this.props.destaque = novoDestaque}
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
    public get horasDeServico() {
        return this.props.horasDeServico
    }


}