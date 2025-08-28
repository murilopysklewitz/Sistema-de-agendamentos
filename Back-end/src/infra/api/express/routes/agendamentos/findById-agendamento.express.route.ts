import { AgendamentoStatus } from "src/domain/agendamento/entity/agendamento";
import { ServicoProps } from "src/domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes";
import { Request, Response } from "express";
import { FindByIdAgendamentoInputDTO, FindByIdAgendamentoUsecase } from "src/usecases/agendamento.usecases/findById-agendamentos/findByIdAgendamentos.usecase";

export type FindByIdAgendamentoResponseDto = {
        id: string;
        clienteId: string;
        servico: ServicoProps;
        data: Date;
        horaInicio: Date;
        horaFim: Date;
        status: AgendamentoStatus ;
        createdAt: Date;
        updatedAt: Date;
}

export class FindByIdAgendamentoRoute implements Route {
    private constructor(
        private readonly path:string,
        private readonly method: HttpMethod,
        private readonly findByIdAgendamentoService: FindByIdAgendamentoUsecase,
    ){}

    public static create(findByIdAgendamentoService: FindByIdAgendamentoUsecase){
        return new FindByIdAgendamentoRoute("/api/agendamento/:id", HttpMethod.GET ,findByIdAgendamentoService);
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const {id} = request.params;
                const input: FindByIdAgendamentoInputDTO = {id};

                const result = await this.findByIdAgendamentoService.execute(input);

                response.status(200).json(result);
            } catch (error: any) {
                console.error("Erro na rota findById:", error);
                response.status(500).json({ message: "Erro interno do servidor" });
            }
        }
    }


    public getPath(): string {
        return this.path;
    }
    public getMethod(): HttpMethod {
        return this.method;
    }


}