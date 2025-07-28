import { Servico } from "./servico"

export type AgendamentoProps = {
    id: String;
    idDoUsuario: String;
    servico: Servico;
    data: Date;
    horaDoInicio: Date;
    horaDoFim: Date;
    status: "FINALIZADO" | "AGENDADO" | "CANCELADO" | "CONCLUIDO" ;
    createdAt: Date;
    updatedAt: Date;
}

    export class Agendamento{
        private constructor(private readonly props: AgendamentoProps) {}

        public static create(  
            idDoUsuario: String,
            servico: Servico,
            data: Date,
            horaDoInicio: Date,
            horaDoFim: Date,
            status: "FINALIZADO" | "AGENDADO" | "CANCELADO" | "CONCLUIDO" ,
            createdAt: Date,
            updatedAt: Date
        ) {
            return new Agendamento({
                id: crypto.randomUUID().toString(),
                idDoUsuario,
                servico,
                data,
                horaDoInicio,
                horaDoFim,
                status,
                createdAt,
                updatedAt
            })
        }

        public static with(props: AgendamentoProps) {
            return new Agendamento(props)
        }
    }