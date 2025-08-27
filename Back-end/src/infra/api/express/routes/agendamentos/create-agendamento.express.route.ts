import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { ServicoProps } from "src/domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { CreateAgendamentoInputDto, CreateAgendamentoUsecase } from "src/usecases/agendamento.usecases/create-agendamento/createAgendamento.usecase";
import { Request, Response } from "express";

export type CreateAgendamentoResponseDto = {
            id: string;
            clienteId: string;
            servico: ServicoProps;
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
        return new CreateAgendamentoRoute('/api/agendamento', HttpMethod.POST, createAgendamentoService)
    }

    public  getHandler() {
        return async (request: Request, response: Response) => {
            const { clienteId, servico, data, horaInicio,} = request.body;

            const input: CreateAgendamentoInputDto = {
                clienteId, servico, data, horaInicio
            }
            const output: CreateAgendamentoResponseDto = await this.createAgendamentoService.execute(input);
            const responseBody = this.present(output);
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
                    servico: input.servico,
                    status: input.status,
                    data: input.data,
                    horaInicio: input.horaInicio,
                    horaFim: input.horaFim,
                }
                return response;
            }
}