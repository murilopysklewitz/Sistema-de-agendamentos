import { Agendamento, AgendamentoStatus } from "../../../domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "../../../domain/agendamento/gateway/agendamento.gateway";
import { ServicoProps } from "../../../domain/servico/entity/servico";
import { Usecase } from "../../../usecases/usecase";



export type FindByIdAgendamentoInputDto = {
    id: string;
}

export type FindByIdAgendamentoOutputDto = {
    id: string;
    clienteId: string;
    servicoId: string;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: AgendamentoStatus ;
        
}

export class FindByIdAgendamentoUsecase implements Usecase<FindByIdAgendamentoInputDto, FindByIdAgendamentoOutputDto> {
    private constructor(private readonly agendamentoGateway: AgendamentoGateway) {

    }
    public static create(agendamentoGateway: AgendamentoGateway) {
        return new FindByIdAgendamentoUsecase(agendamentoGateway)
    }

    public async execute({id}: FindByIdAgendamentoInputDto): Promise<FindByIdAgendamentoOutputDto>  {
        try{
            const agendamento = await this.agendamentoGateway.findById(id)

            if(!agendamento){
                throw new Error("Não foi possivel localizar esse agendamento",)
            }
            const output = this.presentOutput(agendamento);
            
            return output
            
        }catch(error: any) {
            console.error("Erro técnico ao buscar agendamento por ID:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar o agendamento.");
        }
    }

        private presentOutput(agendamento: Agendamento): FindByIdAgendamentoOutputDto {
    
            const output:FindByIdAgendamentoOutputDto = {
                id: agendamento.id,
                clienteId: agendamento.cliente.id,
                servicoId: agendamento.servico.id,
                data: agendamento.data,
                horaInicio: agendamento.horaInicio,
                horaFim: agendamento.horaFim,
                status: agendamento.status
                
            }
            return output
        }

}