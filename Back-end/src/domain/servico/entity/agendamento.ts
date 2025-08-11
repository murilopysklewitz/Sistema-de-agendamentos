import { Servico } from "./servico"

export type AgendamentoProps = {
    id: string;
    clienteId: string;
    servico: Servico;
    data: Date;
    horaInicio: Date;
    horaFim: Date;
    status: AgendamentoStatus ;
    createdAt: Date;
    updatedAt: Date;
}

export type AgendamentoStatus = "CONFIRMADO" | "AGENDADO" | "CANCELADO" | "CONCLUIDO";

    export class Agendamento{

        private static readonly validAgendamentoStatus: AgendamentoStatus[] = ['CONFIRMADO', 'CONCLUIDO', 'AGENDADO', 'CANCELADO']

        public static isValidStatus(status:string): status is AgendamentoStatus {
            return this.validAgendamentoStatus.includes(status as AgendamentoStatus)
        }

        private constructor(private readonly props: AgendamentoProps) {
            if (!Agendamento.isValidStatus(props.status)) {
                throw new Error(`Status de agendamento inválido: ${props.status}`)
            }
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
            clienteId: string,
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

        public get id(): string { return this.props.id; }
        public get servico(): Servico { return this.props.servico; }
        public get clienteId(): string { return this.props.clienteId; }
        public get data(): Date { return this.props.data; }
        public get horaInicio(): Date { return this.props.horaInicio; }
        public get horaFim(): Date { return this.props.horaFim; }
        public get status(): AgendamentoStatus { return this.props.status; }

        public estaEmConflitoCom(outroAgendamento: Agendamento) {
            const mesmoDia = this.data.toDateString() === outroAgendamento.data.toDateString();

            if(!mesmoDia) {
                return false;
            }
            const sobreposicao = this.horaInicio < outroAgendamento.horaFim &&
                                 this.horaFim > outroAgendamento.horaInicio
            return sobreposicao
        }
        
        public cancelar(): void {
            if (this.props.status === "CONCLUIDO" ) {
                throw new Error("Não se pode cancelar um agendamento já concluido");
            }
            this.props.status = 'CANCELADO';
            this.props.updatedAt = new Date();
        }
        public confirmar():void {
            if (this.props.status !== 'AGENDADO') {
                throw new Error("Não é possível confirmar um agendamento que não esteja agendado")
            }
            this.props.status = 'CONFIRMADO';
            this.props.updatedAt = new Date();
        }
    }