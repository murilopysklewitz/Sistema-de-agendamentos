import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway";
import { Usecase } from "../usecase";

export type DeleteServicoInputDto = {
    id:string;
}

export type DeleteServicoOutputDto = void

export class DeleteServicoUsecase implements Usecase<DeleteServicoInputDto, DeleteServicoOutputDto> {

    private constructor(private readonly servicoGateway:ServicoGateway) {}

    public static create(servicoGateway:ServicoGateway) {
        return new DeleteServicoUsecase(servicoGateway)
    }

    public async execute(input:DeleteServicoInputDto): Promise<DeleteServicoOutputDto> {
        await this.servicoGateway.delete(input.id);
        return;
    }
}