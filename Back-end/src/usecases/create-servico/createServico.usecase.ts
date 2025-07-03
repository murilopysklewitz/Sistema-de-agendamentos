import { Usecase } from "../usecase"
import { ServicoGateway } from "../../domain/servico/gateway/servico.gateway";
import { Servico } from "../../domain/servico/entity/servico";


export type CreateServicoInputDto = {
    name:string;
    price:number;
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

    public async execute({name, price}: CreateServicoInputDto): Promise<CreateServicoOutputDto> {
        const aServico = Servico.create(name, price);

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