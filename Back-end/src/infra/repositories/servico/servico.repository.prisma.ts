import { PrismaClient } from "../../../../generated/prisma";
import { Servico } from "../../../domain/servico/entity/servico";
import { ServicoGateway } from "../../../domain/servico/gateway/servico.gateway";

export class ServicoRepositoryPrisma implements ServicoGateway {

    private constructor(private readonly prismaClient: PrismaClient) {

    }
    public static create(prismaClient:PrismaClient) {
        return new ServicoRepositoryPrisma(prismaClient)
    }

    public async save(servico:Servico): Promise<void> {
        const data = {
            nome: servico.name,
            preco: servico.price,
            descricao: servico.description ?? "",
            destaque: servico.highlight,
        }

        await this.prismaClient.servico.upsert({
            where: { id: servico.id }, 
            update: data,              
            create: data,          
        });
        
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

    public async findById(id: string): Promise<Servico | null> {
        const servico = await this.prismaClient.servico.findUnique({
            where: {id:id},
        });
        if(!servico) {
            return null
        }
        return Servico.with({
            id: servico.id,
            name: servico.nome,
            price: servico.preco,
            description: servico.descricao,
            highlight: servico.destaque
        })
    }

    public async update(servico: Servico): Promise<void> {
            const data = {
                name:servico.name,
                price:servico.price,
                description:servico.description ?? "",
                highlight:servico.highlight
            }

             await this.prismaClient.servico.update({
                where: { id: servico.id},
                data: data });
    }

    public async delete(id: string): Promise<void> {
        await this.prismaClient.servico.delete({
            where: {id:id},
        })
    }
}