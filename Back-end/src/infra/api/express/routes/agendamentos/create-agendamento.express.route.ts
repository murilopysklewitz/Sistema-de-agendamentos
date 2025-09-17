
import { ServicoProps } from "../../../../../domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";
import { AgendamentoStatus } from "../../../../../domain/agendamento/entity/agendamento";
import { CreateAgendamentoInputDto, CreateAgendamentoUsecase } from "../../../../../usecases/agendamento.usecases/create-agendamento/createAgendamento.usecase";

export type CreateAgendamentoResponseDto = {
            id: string;
            clienteId: string;
            servicoId: string;
            data: Date;
            horaInicio: Date;
            horaFim: Date;
            status: AgendamentoStatus ;
}
export class CreateAgendamentoRoute implements Route {
    private constructor(
        private readonly path:string,
        private readonly method: HttpMethod,
        private readonly createAgendamentoService: CreateAgendamentoUsecase,
    ){}

    public static create(createAgendamentoService: CreateAgendamentoUsecase) {
        return new CreateAgendamentoRoute('/api/agendamentos', HttpMethod.POST, createAgendamentoService)
    }

    public  getHandler() {
        return async (request: Request, response: Response) => {
            const { clienteId, servicoId, data, horaInicio,} = request.body;

            const input: CreateAgendamentoInputDto = {
                clienteId,
                servicoId,
                data: new Date(data),
                horaInicio: new Date(horaInicio)
            }
            const output: CreateAgendamentoResponseDto = await this.createAgendamentoService.execute(input);
            const responseBody = this.present(output);
             response.status(201).json(responseBody)
        }
    }
               public getPath():string {
                return this.path
            }
        
            public getMethod(): HttpMethod {
                return this.method;
            }
        
            private present(input:CreateAgendamentoResponseDto): CreateAgendamentoResponseDto {
                const response = {
                    id: input.id,
                    clienteId: input.clienteId,
                    servicoId: input.servicoId,
                    status: input.status,
                    data: input.data,
                    horaInicio: input.horaInicio,
                    horaFim: input.horaFim,
                }
                return response;
            }
}