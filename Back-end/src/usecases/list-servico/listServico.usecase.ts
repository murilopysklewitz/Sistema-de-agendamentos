import { ServicoGateway } from "../../domain/servico/gateway/servico.gateway";
import { Usecase } from "../usecase";
import { Servico } from "../../domain/servico/entity/servico";

export type ListServicoInputDto = void;

export type ListServicoOutputDto = {
    servicos: {
        id:string;
        name:string;
        price:number;
        description:string;
        highlight:boolean
    }[]
}

export class ListServicoUsecase implements Usecase<ListServicoInputDto, ListServicoOutputDto> {
    private constructor (private readonly servicoGateway: ServicoGateway){

    }
    public static create(servicoGateway: ServicoGateway) {
        return new ListServicoUsecase(servicoGateway);
    }

    public async execute(input:void): Promise<ListServicoOutputDto> {

        const aServico = await this.servicoGateway.list();
        const output = this.presentOutput(aServico);
        return output;
    }

    private presentOutput(servicos: Servico[]): ListServicoOutputDto {

        return{
            servicos: servicos.map((p) => {
                return {
                    id:p.id,
                    name:p.name,
                    price:p.price,
                    description:p.description,
                    highlight:p.highlight
                }
            })
        }
    }
}
