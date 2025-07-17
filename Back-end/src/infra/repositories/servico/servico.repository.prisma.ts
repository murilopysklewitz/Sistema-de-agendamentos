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
            nome: servico.nome,
            preco: servico.preco,
            descricao: servico.descricao ?? "",
            destaque: servico.destaque,
            horasDeServico: servico.horasDeServico,
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
                nome:p.nome,
                preco:p.preco,
                descricao:p.descricao,
                destaque:p.destaque,
                horasDeServico: p.horasDeServico
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
            nome: servico.nome,
            preco: servico.preco,
            descricao: servico.descricao,
            destaque: servico.destaque,
            horasDeServico: servico.horasDeServico
        })
    }

    public async update(servico: Servico): Promise<void> {
            const data = {
                nome:servico.nome,
                preco:servico.preco,
                descricao:servico.descricao ?? "",
                destaque:servico.destaque,
                horasDeServico: servico.horasDeServico
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