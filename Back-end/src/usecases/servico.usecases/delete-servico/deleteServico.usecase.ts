// src/usecases/delete-servico/deleteServico.usecase.ts

import { Usecase } from "../../usecase";
import { ServicoGateway } from "../../../domain/servico/gateway/servico.gateway";

export type DeleteServicoInputDto = {
    id: string;
};

export type DeleteServicoOutputDto = void;

export class DeleteServicoUsecase implements Usecase<DeleteServicoInputDto, DeleteServicoOutputDto> {
    private constructor(private readonly servicoGateway: ServicoGateway) {}

    public static create(servicoGateway: ServicoGateway): DeleteServicoUsecase {
        return new DeleteServicoUsecase(servicoGateway);
    }

    public async execute(input: DeleteServicoInputDto): Promise<DeleteServicoOutputDto> {

        if (!input.id) {
            throw new Error("ID do serviço é obrigatório para deleção.");
        }


        const servicoExistente = await this.servicoGateway.findById(input.id);
        if (!servicoExistente) {

            throw new Error(`Serviço com ID ${input.id} não encontrado para deleção.`);
        }
        await this.servicoGateway.delete(input.id);

        return; 
    }
}
