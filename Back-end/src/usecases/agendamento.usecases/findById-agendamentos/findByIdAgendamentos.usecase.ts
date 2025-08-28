import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "src/domain/agendamento/gateway/agendamento.gateway";
import {  ServicoProps } from "src/domain/servico/entity/servico";
import { Usecase } from "src/usecases/usecase";

export type FindByIdAgendamentoInputDTO = {
    id: string;
}

export type FindByIdAgendamentoOutputDTO = {
    id: string;
    clienteId: string;
    servico: ServicoProps;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: AgendamentoStatus ;
        
}

export class FindByIdAgendamentoUsecase implements Usecase<FindByIdAgendamentoInputDTO, FindByIdAgendamentoOutputDTO> {
    private constructor(private readonly agendamentoGateway: AgendamentoGateway) {

    }
    public static create(agendamentoGateway: AgendamentoGateway) {
        return new FindByIdAgendamentoUsecase(agendamentoGateway)
    }

    public async execute({id}: FindByIdAgendamentoInputDTO): Promise<FindByIdAgendamentoOutputDTO>  {
        try{
            const agendamento = await this.agendamentoGateway.findById(id)

            if(!agendamento){
                console.log("Nao foi possível localizar esse agendamento.")
                throw new Error("Não foi possivel localizar esse agendamento")
            }
            return agendamento;
        }catch(error: any) {
            console.error("Erro técnico ao buscar agendamento por ID:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar o agendamento.");
        }
    }

}