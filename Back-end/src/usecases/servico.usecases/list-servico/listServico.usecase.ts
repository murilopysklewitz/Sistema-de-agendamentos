import { ServicoGateway } from "../../../domain/servico/gateway/servico.gateway";
import { Usecase } from "../../usecase";
import { Servico } from "../../../domain/servico/entity/servico";

export type ListServicoInputDto = void;

export type ListServicoOutputDto = {
    servicos: {
        id:string;
        nome:string;
        preco:number;
        descricao:string | null;
        destaque:boolean;
        horasDeServico:number | null;
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
                    nome:p.nome,
                    preco:p.preco,
                    descricao:p.descricao,
                    destaque:p.destaque,
                    horasDeServico: p.horasDeServico
                }
            })
        }
    }
}
