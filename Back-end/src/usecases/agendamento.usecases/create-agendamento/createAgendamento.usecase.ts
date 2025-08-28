import { Agendamento, AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { Servico, ServicoProps } from "src/domain/servico/entity/servico";
import { AgendamentoGateway } from "src/domain/agendamento/gateway/agendamento.gateway";
import { Usecase } from "src/usecases/usecase";
import { AgendamentoValidator } from "src/domain/agendamento/service/agendamento-validator.interface";
import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway";

export interface CreateAgendamentoInputDto {
    clienteId: string,
    servicoId: string,
    data: Date,
    horaInicio: Date,
}
export interface CreateAgendamentoOutputDto {
        id: string;
        clienteId: string;
        servico: ServicoProps;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus ;
}

export class CreateAgendamentoUsecase implements Usecase<CreateAgendamentoInputDto, CreateAgendamentoOutputDto> {
    private constructor(
        private readonly agendamentoGateway: AgendamentoGateway, 
        private readonly agendamentoValidator: AgendamentoValidator,
        private readonly servicoGateway: ServicoGateway ) {

    }
    public static create(agendamentoGateway: AgendamentoGateway, agendamentoValidator: AgendamentoValidator, servicoGateway: ServicoGateway) {
        return new CreateAgendamentoUsecase(agendamentoGateway, agendamentoValidator, servicoGateway)
    }

    public async execute({clienteId, servicoId, data, horaInicio}: CreateAgendamentoInputDto): Promise<CreateAgendamentoOutputDto> {
        const servicoSelecionado = await this.servicoGateway.findById(servicoId)
        if(!servicoSelecionado){
            throw new Error("Serviço com id não encontrado")
        }
        const aAgendamento = Agendamento.create(clienteId, servicoSelecionado, data, horaInicio)
        try{
            await this.agendamentoValidator.validateNoConflict(aAgendamento)

        }catch(error: any){
            throw new Error("Não foi possivel criar um agendamento, conflito de horário", error)
        }
        
        await this.agendamentoGateway.save(aAgendamento)

        const output = this.presentOutput(aAgendamento, servicoSelecionado)

        return output
    }

    private presentOutput(agendamento: Agendamento, servico:Servico): CreateAgendamentoOutputDto {

        const output:CreateAgendamentoOutputDto = {
            id: agendamento.id,
            clienteId: agendamento.clienteId,
            servico: servico.prop,
            data: agendamento.data,
            horaInicio: agendamento.horaInicio,
            horaFim: agendamento.horaFim,
            status: agendamento.status
            
        }
        return output
    }
}