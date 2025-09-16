import { PrismaClient } from "@prisma/client";
import { Agendamento } from "../../../domain/agendamento/entity/agendamento";
import { AgendamentoGateway } from "../../../domain/agendamento/gateway/agendamento.gateway";
import { AgendamentoMapperPrisma } from "../../../infra/database/prisma/mappers/agendamento.mapper";



export class AgendamentoRepository implements AgendamentoGateway {

    private constructor(
        private readonly prismaClient: PrismaClient,
        private readonly mapper: AgendamentoMapperPrisma
    ) { }

    public static create(prismaClient: PrismaClient, mapper: AgendamentoMapperPrisma) {
        return new AgendamentoRepository(prismaClient, mapper);
    }

    public async save(agendamento: Agendamento): Promise<Agendamento> {
        const agendamentoPrisma = this.mapper.toPrisma(agendamento)

        const saved = await this.prismaClient.agendamento.upsert({
            where: { id: agendamentoPrisma.id },
            update: agendamentoPrisma,
            create: agendamentoPrisma,
            include: {
                cliente: true,
                servico: true
            }
        });
        return this.mapper.toDomain(saved)
    }

    public async findById(id: string): Promise<Agendamento> {
        const agendamentoPrisma = await this.prismaClient.agendamento.findUnique({
            where: { id },
            include: {
                cliente: true,
                servico: true
            }
        })
        if(!agendamentoPrisma) {
            throw new Error("Agendamento não achado no banco de dados")
        }
        return this.mapper.toDomain(agendamentoPrisma)
    }


    public async list(): Promise<Agendamento[]> {
        const agendamentosPrisma = await this.prismaClient.agendamento.findMany({
            include: {
                cliente: true,
                servico: true
            }
        });

        return agendamentosPrisma.map(agendamentoPrisma => this.mapper.toDomain(agendamentoPrisma))
    }

    public async findByInterval(data: Date, horaInicio: Date, horafim: Date): Promise<Agendamento[]>{
        const agendamentosPrisma = await this.prismaClient.agendamento.findMany({
            where: {
                data: {
                    equals: data
                },
                AND: {
                    OR: [
                        {
                            // lt = less than
                            horaInicio: {lt:horafim},
                            //gt = greater than
                            horaFim: {gt:horaInicio},
                        },
                        {
                            //gte = greater than or equals
                            horaInicio: {gte: horaInicio, lt: horafim},
                        },
                        {
                            //lte = less than or equals
                            horaInicio: {lte: horaInicio},
                            horaFim: {gte: horafim}
                        }
                    ]
                }
            },
            include: {
                cliente: true,
                servico: true
            }
        })
        return agendamentosPrisma.map(agendamentoPrisma => this.mapper.toDomain(agendamentoPrisma))
    }
}