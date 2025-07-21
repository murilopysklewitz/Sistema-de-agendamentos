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
    
    public static create (nome:string, preco:number, descricao:string, destaque:boolean, horasDeServico:number) {
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

    public updateDetails(descricao?:string, destaque?:boolean) {
        if(descricao !== undefined){
            this.props.descricao = descricao;
        }
        if(destaque !== undefined) {
            this.props.destaque = destaque;
        }
        
    }

    public updatePreco(newPreco:number) {
        this.props.preco = newPreco
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