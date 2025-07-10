"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoRepositoryPrisma = void 0;
const servico_1 = require("../../../domain/servico/entity/servico");
class ServicoRepositoryPrisma {
    prismaClient;
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        return new ServicoRepositoryPrisma(prismaClient);
    }
    async save(servico) {
        const data = {
            id: servico.id,
            name: servico.name,
            price: servico.price,
            description: servico.description,
            highlight: servico.highlight,
        };
        await this.prismaClient.servico.create({
            data,
        });
    }
    async list() {
        const servicos = await this.prismaClient.servico.findMany();
        const servicoList = servicos.map((p) => {
            const servico = servico_1.Servico.with({
                id: p.id,
                name: p.nome,
                price: p.Preco,
                description: p.descricao,
                highlight: p.destaque
            });
            return servico;
        });
        return servicoList;
    }
}
exports.ServicoRepositoryPrisma = ServicoRepositoryPrisma;
