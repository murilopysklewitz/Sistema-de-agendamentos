import { PrismaClient } from "../../../../generated/prisma";
import { Servico } from "../../../domain/servico/entity/servico";
import { ServicoGateway } from "../../../domain/servico/gateway/servico.gateway";

export class ServicoRepositoryPrisma implements ServicoGateway {

    private constructor(private readonly prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async save(servico:Servico): Promise<void> {
        const data = {
            nome: servico.name,
            preco: servico.price,
            descricao: servico.description ?? "",
            destaque: servico.highlight,
        }

        await this.prismaClient.servico.create({
            data,
        })
        
    }
    public async list(): Promise<Servico[]> {
        const servicos = await this.prismaClient.servico.findMany();

        const servicoList = servicos.map((p) => {
            const servico = Servico.with({
                id:p.id,
                name:p.nome,
                price:p.preco,
                description:p.descricao,
                highlight:p.destaque
            })
            return servico
        })
        return servicoList
    }
}