import { PrismaClient } from "@prisma/client";
import { Agendamento } from "src/domain/servico/entity/agendamento";
import { AgendamentoGateway } from "src/domain/servico/gateway/agendamento.gateway";
import { AgendamentoMapperPrisma } from "src/infra/database/prisma/mappers/agendamento.mapper";


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

    public async findById(id: string): Promise<Agendamento | null> {
        const agendamentoPrisma = await this.prismaClient.agendamento.findUnique({
            where: { id },
            include: {
                cliente: true,
                servico: true
            }
        })
        if(!agendamentoPrisma) {
            return null;
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

}