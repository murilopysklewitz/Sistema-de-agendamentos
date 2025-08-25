import { Agendamento, AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "src/domain/agendamento/gateway/agendamento.gateway";
import { Servico } from "src/domain/servico/entity/servico";
import { Usecase } from "src/usecases/usecase";

export type FindByIdAgendamentoInputDTO = {
    id: string;
}

export type FindByIdAgendamentoOutputDTO = {
    id: string;
    clienteId: string;
    servico: Servico;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: AgendamentoStatus ;
        
}

export class FindByIdAgendamento implements Usecase<FindByIdAgendamentoInputDTO, FindByIdAgendamentoOutputDTO> {
    private constructor(private readonly agendamentoGateway: AgendamentoGateway) {

    }
    public static create(agendamentoGateway: AgendamentoGateway) {
        return new FindByIdAgendamento(agendamentoGateway)
    }

    public async execute({id}: FindByIdAgendamentoInputDTO): Promise<FindByIdAgendamentoOutputDTO>  {
        try{
            const agendamento = await this.agendamentoGateway.findById(id)

            return agendamento;
        }catch(error: any) {
            throw new Error("Erro ao procurar ID",)
        }
    }

}