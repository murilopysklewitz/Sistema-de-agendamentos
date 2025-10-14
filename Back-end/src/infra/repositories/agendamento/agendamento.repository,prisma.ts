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
        console.log("tentando salvar agendamento:", agendamento);
        const agendamentoPrisma = this.mapper.toPrisma(agendamento);
        console.log("mapendo agendamento para o prisma:", agendamentoPrisma);

        const saved = await this.prismaClient.agendamento.upsert({
            where: { id: agendamentoPrisma.id },
            update: agendamentoPrisma,
            create: agendamentoPrisma,
            include: {
                cliente: true,
                servico: true
            }
        });
        console.log("AgendamentoRepository.save - saved:", saved);
        return this.mapper.toDomain(saved);
    }

    public async findById(id: string): Promise<Agendamento> {
        console.log("Tentando achar agendamento por id:", id)
        const agendamentoPrisma = await this.prismaClient.agendamento.findUnique({
            where: { id },
            include: {
                cliente: true,
                servico: true
            }
        })
        if(!agendamentoPrisma) {
            console.log("AgendamentoRepository.findById - agendamento não achado no banco de dados")
            throw new Error("Agendamento não achado no banco de dados")
        }
        console.log("vou mapear para dominio:", agendamentoPrisma)
        const agendamento = this.mapper.toDomain(agendamentoPrisma)
        console.log("mapeamento concluido:", agendamento)
        return agendamento
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

public async findByInterval(data: Date): Promise<Agendamento[]> {

    const startOfDay = new Date(data);
    startOfDay.setHours(0, 0, 0, 0);
    

    const endOfDay = new Date(data);
    endOfDay.setHours(23, 59, 59, 999);

    const agendamentosPrisma = await this.prismaClient.agendamento.findMany({
        where: {
            horaInicio: {
                gte: startOfDay,
                lte: endOfDay
            }
        },
        include: {
            cliente: true,
            servico: true
        }
    });

    return agendamentosPrisma.map(a => this.mapper.toDomain(a));
}
}