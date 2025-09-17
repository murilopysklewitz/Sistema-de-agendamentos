import { PrismaClient } from "@prisma/client";
import { Cliente } from "domain/cliente/entity/cliente";
import { ClienteGateway } from "domain/cliente/gateway/cliente.gateway";

export class ClienteRepository implements ClienteGateway {
    private constructor(private readonly prismaClient: PrismaClient) {

    }

    public static create(prismaClient: PrismaClient) {
        return new ClienteRepository(prismaClient)
    }

    public async save(cliente: Cliente): Promise<string> {
        try {
            const data = {
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero
            }
            await this.prismaClient.cliente.upsert({
                where: {id: cliente.id},
                update: data,
                create: data
            })
            return cliente.id
        }catch(error: any) {
            throw new Error("Não foi possivel salvar cliente no banco de dados");
        }
    }
}