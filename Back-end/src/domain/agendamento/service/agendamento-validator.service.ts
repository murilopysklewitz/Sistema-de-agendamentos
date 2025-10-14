import { Agendamento } from "../entity/agendamento";
import { AgendamentoGateway } from "../gateway/agendamento.gateway";
import { AgendamentoValidator } from "./agendamento-validator.interface";

export const businessHours = {
    startHour: 9,
    endHour: 18
}

export class AgendamentoValidatorService implements AgendamentoValidator {
    private constructor(private readonly agendamentoGateway: AgendamentoGateway) {
        console.log("AgendamentoValidatorService constructor called")
    }
    
    public static create(agendamentoGateway: AgendamentoGateway) {
        return new AgendamentoValidatorService(agendamentoGateway)
    }

    public async validateAll(agendamento: Agendamento): Promise<void> {
        await this.validateNoConflict(agendamento)
    }

    private async validateNoConflict(agendamento: Agendamento): Promise<void> {
        try {

            const agendamentosDoDia = await this.agendamentoGateway.findByInterval(
                agendamento.data
            );
            

            const conflitoEncontrado = agendamentosDoDia.some(
                (existente) => agendamento.estaEmConflitoCom(existente)
            );
            
            if (conflitoEncontrado) {
                throw new Error("Já existe um agendamento nesse horário");
            }
        } catch (error: any) {

            if (error.message.includes("Já existe")) {
                throw error;
            }
            throw new Error(`Erro ao validar conflitos: ${error.message}`);
        }
    }
}