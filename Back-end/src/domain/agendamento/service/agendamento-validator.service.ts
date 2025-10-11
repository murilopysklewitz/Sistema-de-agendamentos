import { Agendamento } from "../entity/agendamento";
import { AgendamentoGateway } from "../gateway/agendamento.gateway";
import { AgendamentoValidator } from "./agendamento-validator.interface";


export const businessHours = {
    startHour: 9,
    endHour: 18
}
export class AgendamentoValidatorService implements AgendamentoValidator{
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
            const agendamentosConflitantes = await this.agendamentoGateway.findByInterval(
                agendamento.data,
                agendamento.horaInicio,
                agendamento.horaFim
            )
            const conflitoEncontrado = agendamentosConflitantes.some(
                (conflitante) => agendamento.estaEmConflitoCom(conflitante)
            )
            if(conflitoEncontrado) {
                throw new Error("Já existe um agendamento nesse horario")
            }
        }catch(error: any) {
            throw new Error(`houve um erro ao validar conflitos ${error}`)
        }
    }
}