import { Agendamento, AgendamentoStatus } from "../../../domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "../../../domain/agendamento/gateway/agendamento.gateway";
import { ServicoProps } from "../../../domain/servico/entity/servico";
import { Usecase } from "../../../usecases/usecase";


export type ListAgendamentoInputDto = void;

export type ListAgendamentoOutputDto = {
    agendamentos: {
    id: string;
    clienteId: string;
    servicoId: string;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: AgendamentoStatus ;
    }[]
}

export class ListAgendamentoUsecase implements Usecase<ListAgendamentoInputDto, ListAgendamentoOutputDto> {
    private constructor(private readonly agendamentoGateway: AgendamentoGateway) {

    }

    public static create(agendamentoGateway: AgendamentoGateway){
        return new ListAgendamentoUsecase(agendamentoGateway)
    }

    public async execute(): Promise<ListAgendamentoOutputDto> {
        const listarServicos = await this.agendamentoGateway.list()

        const output = this.presentOutput(listarServicos);
        return output;
    }

    private presentOutput(agendamentos: Agendamento[]): ListAgendamentoOutputDto {
        return {
            agendamentos: agendamentos.map((p) => {
                return{
                id: p.id,
                clienteId: p.cliente.id,
                servicoId: p.servico.id,
                data: p.data,
                horaInicio: p.horaInicio,
                horaFim: p.horaFim,
                status: p.status,
                }
            })
        }
    }
}