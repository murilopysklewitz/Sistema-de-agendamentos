import { Usecase } from "../../usecase"
import { ServicoGateway } from "../../../domain/servico/gateway/servico.gateway";
import { Servico } from "../../../domain/servico/entity/servico";


export type CreateServicoInputDto = {
    nome:string;
    preco:number;
    descricao: string;
    destaque: boolean;
    horasDeServico: number;
}
export type CreateServicoOutputDto = {
    id:string;
}

export class CreateServicoUseCase implements Usecase<CreateServicoInputDto, CreateServicoOutputDto>{

    private constructor(private readonly servicoGateway: ServicoGateway) {
        
    }

    public static create(servicoGateway: ServicoGateway) {
        return new CreateServicoUseCase(servicoGateway);
    }

    public async execute({nome, preco, descricao, destaque, horasDeServico}: CreateServicoInputDto): Promise<CreateServicoOutputDto> {
        const aServico = Servico.create(nome, preco, descricao, destaque, horasDeServico);

        await this.servicoGateway.save(aServico);

        const output = this.presentOutput(aServico)
        return output;
    }

    private presentOutput(servico:Servico): CreateServicoOutputDto {
        const output:CreateServicoOutputDto = {
            id:servico.id
        }
        return output;
    }
}