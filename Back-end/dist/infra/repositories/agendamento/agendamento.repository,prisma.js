"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoRepository = void 0;
class AgendamentoRepository {
    prismaClient;
    mapper;
    constructor(prismaClient, mapper) {
        this.prismaClient = prismaClient;
        this.mapper = mapper;
    }
    static create(prismaClient, mapper) {
        return new AgendamentoRepository(prismaClient, mapper);
    }
    async save(agendamento) {
        const agendamentoPrisma = this.mapper.toPrisma(agendamento);
        const saved = await this.prismaClient.agendamento.upsert({
            where: { id: agendamentoPrisma.id },
            update: agendamentoPrisma,
            create: agendamentoPrisma,
            include: {
                cliente: true,
                servico: true
            }
        });
        return this.mapper.toDomain(saved);
    }
    async findById(id) {
        const agendamentoPrisma = await this.prismaClient.agendamento.findUnique({
            where: { id },
            include: {
                cliente: true,
                servico: true
            }
        });
        if (!agendamentoPrisma) {
            return null;
        }
        return this.mapper.toDomain(agendamentoPrisma);
    }
    async list() {
        const agendamentosPrisma = await this.prismaClient.agendamento.findMany({
            include: {
                cliente: true,
                servico: true
            }
        });
        return agendamentosPrisma.map(agendamentoPrisma => this.mapper.toDomain(agendamentoPrisma));
    }
    async findByInterval(data, horaInicio, horafim) {
        const agendamentosPrisma = await this.prismaClient.agendamento.findMany({
            where: {
                data: {
                    equals: data
                },
                AND: {
                    OR: [
                        {
                            // lt = less than
                            horaInicio: { lt: horafim },
                            //gt = greater than
                            horaFim: { gt: horaInicio },
                        },
                        {
                            //gte = greater than or equals
                            horaInicio: { gte: horaInicio, lt: horafim },
                        },
                        {
                            //lte = less than or equals
                            horaInicio: { lte: horaInicio },
                            horaFim: { gte: horafim }
                        }
                    ]
                }
            },
            include: {
                cliente: true,
                servico: true
            }
        });
        return agendamentosPrisma.map(agendamentoPrisma => this.mapper.toDomain(agendamentoPrisma));
    }
}
exports.AgendamentoRepository = AgendamentoRepository;
