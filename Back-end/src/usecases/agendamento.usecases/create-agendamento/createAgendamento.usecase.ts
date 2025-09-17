
import { ClienteGateway } from "../../../domain/cliente/gateway/cliente.gateway";
import { Agendamento, AgendamentoStatus } from "../../../domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "../../../domain/agendamento/gateway/agendamento.gateway";
import { AgendamentoValidator } from "../../../domain/agendamento/service/agendamento-validator.interface";
import { Servico, ServicoProps } from "../../../domain/servico/entity/servico";
import { ServicoGateway } from "../../../domain/servico/gateway/servico.gateway";
import { Usecase } from "../../../usecases/usecase";
import { Cliente } from "../../../domain/cliente/entity/cliente";


export interface CreateAgendamentoInputDto {
    clienteId: string,
    servicoId: string,
    data: Date,
    horaInicio: Date,
}
export interface CreateAgendamentoOutputDto {
        id: string;
        clienteId: string;
        servicoId: string;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus;
}

export class CreateAgendamentoUsecase implements Usecase<CreateAgendamentoInputDto, CreateAgendamentoOutputDto> {
    private constructor(
        private readonly agendamentoGateway: AgendamentoGateway, 
        private readonly agendamentoValidator: AgendamentoValidator,
        private readonly servicoGateway: ServicoGateway,
        private readonly clienteGateway: ClienteGateway ) {

    }
    public static create(agendamentoGateway: AgendamentoGateway, agendamentoValidator: AgendamentoValidator, servicoGateway: ServicoGateway, ClienteGateway: ClienteGateway) {
        return new CreateAgendamentoUsecase(agendamentoGateway, agendamentoValidator, servicoGateway, ClienteGateway)
    }

    public async execute({clienteId, servicoId, data, horaInicio}: CreateAgendamentoInputDto): Promise<CreateAgendamentoOutputDto> {

        const cliente = await this.clienteGateway.findById(clienteId)
        if(!cliente) {
            throw new Error("Cliente com id não encontrado")
        }

        const servicoSelecionado = await this.servicoGateway.findById(servicoId)
        if(!servicoSelecionado){
            throw new Error("Serviço com id não encontrado")
        }
        const aAgendamento = Agendamento.create(cliente, servicoSelecionado, data, horaInicio)
        try{
            await this.agendamentoValidator.validateNoConflict(aAgendamento)

        }catch(error: any){
            throw new Error("Não foi possivel criar um agendamento, conflito de horário", error)
        }
        
        await this.agendamentoGateway.save(aAgendamento)

        const output = this.presentOutput(aAgendamento)

        return output
    }

    private presentOutput(agendamento: Agendamento): CreateAgendamentoOutputDto {

        const output:CreateAgendamentoOutputDto = {
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