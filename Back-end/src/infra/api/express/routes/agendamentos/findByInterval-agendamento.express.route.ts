import { ServicoProps } from "../../../../../domain/servico/entity/servico";
import { HttpMethod, Route } from "../routes"
import { Request, Response } from "express";
import { AgendamentoStatus } from "../../../../../domain/agendamento/entity/agendamento";
import { FindByIntervalAgendamentoUsecase } from "../../../../../usecases/agendamento.usecases/findByIntervalAgendamento.Usecase";


export type FindByIntervalAgendamentoResponse = {
    agendamentos: {
                id: string;
                clienteId: string;
                servicoId: string;
                data: Date;
                horaInicio: Date;
                horaFim: Date;
                status: AgendamentoStatus;
                createdAt: Date;
                updatedAt: Date;
    }[]
}
export class FindByIntervalAgendamentoRoute implements Route {

    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly findByIntervalAgendamentoService: FindByIntervalAgendamentoUsecase
    ) {}

    public static create(findByIntervalAgendamentoService: FindByIntervalAgendamentoUsecase) {
        return new FindByIntervalAgendamentoRoute(
            "/api/agendamentos/date", // Melhor nome
            HttpMethod.GET, 
            findByIntervalAgendamentoService
        );
    }
    
    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const { data } = request.query;
                
                if (!data) {
                    response.status(400).json({ 
                        error: "Parâmetro 'data' é obrigatório (formato: YYYY-MM-DD)" 
                    });
                    return;
                }
    

                const dataDate = new Date(data as string);
                

                if (isNaN(dataDate.getTime())) {
                    response.status(400).json({ 
                        error: "Data inválida. Use formato: YYYY-MM-DD" 
                    });
                    return;
                }
    
                console.log(`Buscando agendamentos para data: ${dataDate.toISOString()}`);
    
                const agendamentosAchados = await this.findByIntervalAgendamentoService.execute({
                    data: dataDate
                });
    
                response.status(200).json(agendamentosAchados);
            } catch(error: any) {
                console.error(`Erro: ${error.message}`);
                response.status(500).json({ error: error.message });
            }
        }
    }
    public getPath(): string {
        return this.path;
    }
    public getMethod(): HttpMethod {
        return this.httpMethod;
    }
}