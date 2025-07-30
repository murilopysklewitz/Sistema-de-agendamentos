import { Servico } from "./servico"

export type AgendamentoProps = {
    id: String;
    clienteId: String;
    servico: Servico;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: "FINALIZADO" | "AGENDADO" | "CANCELADO" | "CONCLUIDO" ;
    createdAt: Date;
    updatedAt: Date;
}

    export class Agendamento{
        private constructor(private readonly props: AgendamentoProps) {
            if (!props.id) throw new Error("Agendamento deve ter um ID.");
            if (!props.servico) throw new Error("Agendamento deve ter um serviço.");
            if (!props.clienteId) throw new Error("Agendamento deve ter um cliente.");
            if (!props.data) throw new Error("Agendamento deve ter uma data.");
            if (!props.horaInicio) throw new Error("Agendamento deve ter uma hora de início.");
            if (!props.horaFim) throw new Error("Agendamento deve ter uma hora de fim.");
            if (props.horaInicio >= props.horaFim) {
                throw new Error("Hora de início deve ser anterior à hora de fim.");
            }
        }

        public static create(  
            clienteId: String,
            servico: Servico,
            data: Date,
            horaInicio: Date,
  
        ): Agendamento {

            const horaFim = new Date (horaInicio.getTime() + servico.duracaoEmMinutos * 60 * 1000)
            return new Agendamento({
                id: crypto.randomUUID().toString(),
                clienteId,
                servico,
                data,
                horaInicio,
                horaFim,
                status: 'AGENDADO',
                createdAt: new Date,
                updatedAt: new Date
            })
        }

        public static with(props: AgendamentoProps) {
            return new Agendamento(props)
        }

        public get id(): String { return this.props.id; }
        public get servico(): Servico { return this.props.servico; }
        public get clienteId(): String { return this.props.clienteId; }
        public get data(): Date { return this.props.data; }
        public get horaInicio(): Date { return this.props.horaInicio; }
        public get horaFim(): Date { return this.props.horaFim; }
        public get status(): "FINALIZADO" | "AGENDADO" | "CANCELADO" | "CONCLUIDO" { return this.props.status; }

        public update() {
            
        }
    }