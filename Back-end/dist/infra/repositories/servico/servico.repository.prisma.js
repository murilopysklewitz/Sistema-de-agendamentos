"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoRepositoryPrisma = void 0;
const servico_1 = require("../../../domain/servico/entity/servico");
class ServicoRepositoryPrisma {
    prismaClient;
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new ServicoRepositoryPrisma(prismaClient);
    }
    async save(servico) {
        const data = {
            nome: servico.nome,
            preco: servico.preco,
            descricao: servico.descricao ?? "",
            destaque: servico.destaque,
            horasDeServico: servico.horasDeServico ?? 1,
        };
        await this.prismaClient.servico.upsert({
            where: { id: servico.id },
            update: data,
            create: data,
        });
    }
    async list() {
        const servicos = await this.prismaClient.servico.findMany();
        const servicoList = servicos.map((p) => {
            const servico = servico_1.Servico.with({
                id: p.id,
                nome: p.nome,
                preco: p.preco,
                descricao: p.descricao,
                destaque: p.destaque,
                horasDeServico: p.horasDeServico
            });
            return servico;
        });
        return servicoList;
    }
    async findById(id) {
        const servico = await this.prismaClient.servico.findUnique({
            where: { id: id },
        });
        if (!servico) {
            return null;
        }
        return servico_1.Servico.with({
            id: servico.id,
            nome: servico.nome,
            preco: servico.preco,
            descricao: servico.descricao,
            destaque: servico.destaque,
            horasDeServico: servico.horasDeServico
        });
    }
    async update(servico) {
        const data = {
            nome: servico.nome,
            preco: servico.preco,
            descricao: servico.descricao ?? "",
            destaque: servico.destaque,
            horasDeServico: servico.horasDeServico
        };
        await this.prismaClient.servico.update({
            where: { id: servico.id },
            data: data
        });
    }
    async delete(id) {
        await this.prismaClient.servico.delete({
            where: { id: id },
        });
    }
}
exports.ServicoRepositoryPrisma = ServicoRepositoryPrisma;
