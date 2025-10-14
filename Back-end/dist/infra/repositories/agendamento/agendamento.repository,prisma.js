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
    async findById(id) {
        console.log("Tentando achar agendamento por id:", id);
        const agendamentoPrisma = await this.prismaClient.agendamento.findUnique({
            where: { id },
            include: {
                cliente: true,
                servico: true
            }
        });
        if (!agendamentoPrisma) {
            console.log("AgendamentoRepository.findById - agendamento não achado no banco de dados");
            throw new Error("Agendamento não achado no banco de dados");
        }
        console.log("vou mapear para dominio:", agendamentoPrisma);
        const agendamento = this.mapper.toDomain(agendamentoPrisma);
        console.log("mapeamento concluido:", agendamento);
        return agendamento;
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
    async findByInterval(data) {
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
exports.AgendamentoRepository = AgendamentoRepository;
