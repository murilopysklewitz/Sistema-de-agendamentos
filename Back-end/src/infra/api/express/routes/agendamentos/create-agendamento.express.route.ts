
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";
import { AgendamentoStatus } from "../../../../../domain/agendamento/entity/agendamento";
import { CreateAgendamentoInputDto, CreateAgendamentoUsecase } from "../../../../../usecases/agendamento.usecases/createAgendamento.usecase";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { IMiddleware } from "../../middlewares/IMiddleware";

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
    private readonly middlewares: IMiddleware[] = []

    private constructor(
        private readonly path:string,
        private readonly method: HttpMethod,
        private readonly createAgendamentoService: CreateAgendamentoUsecase,
        middlewares: IMiddleware[] = []
    ){
        this.middlewares = middlewares
    }

    public static create(createAgendamentoService: CreateAgendamentoUsecase, middlewares: IMiddleware[] =[] ) {
        return new CreateAgendamentoRoute('/api/agendamentos', HttpMethod.POST, createAgendamentoService, middlewares)
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            console.log(`Requisição para criar agendamento ${JSON.stringify(request.body)}`);

            const {clienteId, servicoId, data, horaInicio,} = request.body;

            const input: CreateAgendamentoInputDto = {
                clienteId,
                servicoId,
                data: new Date(data),
                horaInicio: new Date(horaInicio)
            }
            console.log(`Input para criar novo agendamento: ${JSON.stringify(input)}`);

            const output: CreateAgendamentoResponseDto = await this.createAgendamentoService.execute(input);
            console.log(`Output para criar novo agendamento: ${JSON.stringify(output)}`);

            const responseBody = this.present(output);
            console.log(`response body: ${JSON.stringify(responseBody)}`);

            response.status(201).json(responseBody);
        }
    }
               public getPath():string {
                return this.path
            }
        
            public getMethod(): HttpMethod {
                return this.method;
            }
            public getMiddlewares(): IMiddleware[] {
                return this.middlewares
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