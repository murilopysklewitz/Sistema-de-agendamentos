import { Servico } from "src/domain/servico/entity/servico";
import { Usecase } from "../usecase";
import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway";

export type FindByIdServicoInputDto = {
    id: string;
}

export type FindByIdServicoOutputDto = {
    servico: {
        id:string;
        name:string;
        price:number;
        description:string | null;
        highlight:boolean
    }
}

export class FindByIdServicoUsecase implements Usecase<FindByIdServicoInputDto, FindByIdServicoOutputDto> {

    private constructor(private readonly servicoGateway:ServicoGateway) {}

    public static create(servicoGateway:ServicoGateway) {
        return new FindByIdServicoUsecase(servicoGateway);
    }

    public async execute(input: FindByIdServicoInputDto): Promise<FindByIdServicoOutputDto> {
        const aServico = await this.servicoGateway.findById(input.id)

        if(!aServico) {
            throw new Error(`Serviço com ID ${input.id} não foi encontrado`)
        }
        const output:FindByIdServicoOutputDto = {
            servico: {
                id:aServico.id,
                name: aServico.name,
                price: aServico.price,
                description: aServico.description,
                highlight:aServico.highlight
            }
        };
        return output;
    }
    
}