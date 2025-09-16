import { Agendamento, AgendamentoStatus } from "../../../domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "../../../domain/agendamento/gateway/agendamento.gateway";
import { ServicoProps } from "../../../domain/servico/entity/servico";
import { Usecase } from "../../../usecases/usecase";


export type FindByIntervalInputDto =  {
    data: Date, 
    horaInicio: Date,
     horaFim: Date,
}

export type FindByIntervalOutputDto = {
        agendamentos: {
        id: string;
        clienteId: string;
        servico: ServicoProps;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus ;
        }[]
}

export class FindByIntervalAgendamentoUsecase implements Usecase<FindByIntervalInputDto, FindByIntervalOutputDto> {
    private constructor(
        private readonly agendamentoGateway: AgendamentoGateway,
    ) {}

    public static create(agendamentoGateway: AgendamentoGateway)  {
        return new FindByIntervalAgendamentoUsecase(agendamentoGateway)
    }

    public async execute({data, horaInicio, horaFim}: FindByIntervalInputDto): Promise<FindByIntervalOutputDto> {
        try{
            const findByInterval = await this.agendamentoGateway.findByInterval(data, horaInicio, horaFim)
            const output = this.presentOutput(findByInterval)
            return output
        }catch(error:any) {
            console.error("Erro técnico ao buscar agendamentos por espaço de tempo:", error);
            throw new Error("Ocorreu um erro inesperado ao buscar agendamentos por intervalo de tempo.");
        }
    }

    private presentOutput(agendamentos: Agendamento[]) {
        return {
            agendamentos: agendamentos.map((p) =>{
                return{
                    id: p.id,
                    clienteId: p.clienteId,
                    servico: p.servico,
                    data: p.data,
                    horaInicio: p.horaInicio,
                    horaFim: p.horaFim,
                    status: p.status,
                    }
            })
        }
    }

}