export type ServicoProps = {
    id:string;
    name:string;
    price:number;
    description:string | null;
    highlight: boolean;
}
export class Servico {
    private constructor(private props: ServicoProps) {

    }
    
    public static create (name:string, price:number) {
        return new Servico ({
            id:crypto.randomUUID().toString(),
            name,
            price,
            description: null,
            highlight: false,
        });
    }

    public static with(props: ServicoProps) {
        return new Servico(props);
    }

    public updateDetails(description?:string, highlight?:boolean) {
        if(description !== undefined){
            this.props.description = description;
        }
        if(highlight !== undefined) {
            this.props.highlight = highlight;
        }
        
    }

    public updatePrice(newPrice:number) {
        this.props.price = newPrice
    }

    public get id() {
        return this.props.id;
    }
    public get name() {
        return this.props.name;
    }

    public get price() {
        return this.props.price;
    }

    public get description() {
        return this.props.description;
    }
    public get highlight () {
        return this.props.highlight;
    }


}