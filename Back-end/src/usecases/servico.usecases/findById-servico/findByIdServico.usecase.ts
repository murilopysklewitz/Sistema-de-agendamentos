import { Usecase } from "../../usecase";
import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway";

export type FindByIdServicoInputDto = {
    id: string;
}

export type FindByIdServicoOutputDto = {
    servico: {
        id:string;
        nome:string;
        preco:number;
        descricao:string | null;
        destaque:boolean;
        horasDeServico: number | null;
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
                nome: aServico.nome,
                preco: aServico.preco,
                descricao: aServico.descricao,
                destaque:aServico.destaque,
                horasDeServico: aServico.horasDeServico
            }
        };
        return output;
    }
    
}