import { Agendamento, AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { Servico } from "src/domain/servico/entity/servico";
import { AgendamentoGateway } from "src/domain/agendamento/gateway/agendamento.gateway";
import { Usecase } from "src/usecases/usecase";
import { AgendamentoValidator } from "src/domain/agendamento/service/agendamento-validator.interface";

export interface CreateAgendamentoInputDto {
    clienteId: string,
    servico: Servico,
    data: Date,
    horaInicio: Date,
}
export interface CreateAgendamentoOutputDto {
        id: string;
        clienteId: string;
        servico: Servico;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus ;
}

export class CreateAgendamentoUsecase implements Usecase<CreateAgendamentoInputDto, CreateAgendamentoOutputDto> {
    private constructor(private readonly agendamentoGateway: AgendamentoGateway, private readonly agendamentoValidator: AgendamentoValidator ) {

    }
    private static create(agendamentoGateway: AgendamentoGateway, agendamentoValidator: AgendamentoValidator) {
        return new CreateAgendamentoUsecase(agendamentoGateway, agendamentoValidator)
    }

    public async execute({clienteId, servico, data, horaInicio}: CreateAgendamentoInputDto): Promise<CreateAgendamentoOutputDto> {
        const aAgendamento = Agendamento.create(clienteId, servico, data, horaInicio)
        try{
            await this.agendamentoValidator.validateNoConflict(aAgendamento)

        }catch(error: any){
            throw new Error("Não foi possivel criar um agendamento", error)
        }
        
        await this.agendamentoGateway.save(aAgendamento)

        const output = this.presentOutput(aAgendamento)

        return output
    }

    private presentOutput(agendamento: Agendamento): CreateAgendamentoOutputDto {

        const output:CreateAgendamentoOutputDto = {
            id: agendamento.id,
            clienteId: agendamento.clienteId,
            servico: agendamento.servico,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status
            
        }
        return output
    }
}