import { PrismaClient } from "@prisma/client";
import { Cliente, ClienteRole } from "../../../domain/cliente/entity/cliente";
import { ClienteGateway } from "../../../domain/cliente/gateway/cliente.gateway";
import { clienteMapper } from "../../../infra/database/prisma/mappers/cliente.mapper";

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
                numero: cliente.numero,
                senha: cliente.senha,
                role: cliente.role,
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

    public async list(): Promise<Cliente[]> {
        try{
            const clientes = await this.prismaClient.cliente.findMany();

            const clienteList = clientes.map((p) => {
                const cliente = Cliente.with({
                    id: p.id,
                    nome: p.nome,
                    email: p.email,
                    numero: p.numero,
                    senha: p.senha,
                    role: clienteMapper.toDomainRole(p.role),
                })
                return cliente
            }) 
            return clienteList
        }catch(error:any){
            throw new Error("Não foi possível listar os clientes", error)
        }
    }

    public async findByEmail(email: string): Promise<Cliente> {
        const cliente = await this.prismaClient.cliente.findUnique({
            where: {email}
        })
        if (!cliente) {
            throw new Error(`não foi possivel achar por Email`)
        };

        const clienteAchado = Cliente.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            numero: cliente.numero,
            senha: cliente.senha,
            role: clienteMapper.toDomainRole(cliente.role
            )
        });
        return clienteAchado
    }

    public async findById(id: string): Promise<Cliente> {
        const cliente = await this.prismaClient.cliente.findUnique({
            where: {id: id}
        })
        if(!cliente) {
            throw new Error("Cliente com id informado não encontrado")
        }

        const clienteAchado = Cliente.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            numero: cliente.numero,
            senha : cliente.senha,
            role: clienteMapper.toDomainRole(cliente.role
            )
        })
        return clienteAchado
    }

    public async update(cliente: Cliente): Promise<void> {
        try{
            await this.prismaClient.cliente.update({
                where: {id: cliente.id},
                data: {
                    nome: cliente.nome,
                    email: cliente.email,
                    numero: cliente.numero,
                    senha: cliente.senha,
                }
            })
        }catch(error: any) {
            throw new Error("Erro ao modificar o cliente", error)
        }
    }

    public async delete(id: string): Promise<void> {
        try{
            await this.prismaClient.cliente.delete({
                where: {id: id}
            })
        }catch(error:any) {
            throw new Error("Erro ao deletar usuário")
        }
    }
}