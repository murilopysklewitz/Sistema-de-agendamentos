"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const cliente_1 = require("../../../domain/cliente/entity/cliente");
const cliente_mapper_1 = require("../../../infra/database/prisma/mappers/cliente.mapper");
class ClienteRepository {
    prismaClient;
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new ClienteRepository(prismaClient);
    }
    async save(cliente) {
        try {
            console.log("salvando cliente com Id:", cliente.id);
            const data = {
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
                senha: cliente.senha,
                role: cliente.role,
            };
            console.log("salvando dados do cliente:", data);
            const saved = await this.prismaClient.cliente.upsert({
                where: { id: cliente.id },
                update: data,
                create: data
            });
            console.log("Cliente salvo com id:", saved.id);
            return saved.id;
        }
        catch (error) {
            console.error("Error salvando cliente:", error);
            throw new Error("Não foi possivel salvar cliente no banco de dados");
        }
    }
    async list() {
        try {
            console.log("Listando clientes...");
            const clientes = await this.prismaClient.cliente.findMany();
            console.log("Clientes encontrados:", clientes);
            const clienteList = clientes.map((p) => {
                console.log("Mapeando cliente:", p);
                const cliente = cliente_1.Cliente.with({
                    id: p.id,
                    nome: p.nome,
                    email: p.email,
                    numero: p.numero,
                    senha: p.senha,
                    role: cliente_mapper_1.clienteMapper.toDomainRole(p.role),
                });
                console.log("Cliente mapeado:", cliente);
                return cliente;
            });
            console.log("Clientes mapeados:", clienteList);
            return clienteList;
        }
        catch (error) {
            console.error("Erro ao listar os clientes:", error);
            throw new Error("Não foi possível listar os clientes", error);
        }
    }
    async findByEmail(email) {
        console.log(`procurando cliente com email: ${email}`);
        const cliente = await this.prismaClient.cliente.findUnique({
            where: { email },
        });
        if (!cliente) {
            console.log(`Cliente não encontrado com email: ${email}`);
        }
        else {
            console.log(`Client encontrado por email: ${email}`);
            return cliente_1.Cliente.with({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
                senha: cliente.senha,
                role: cliente_mapper_1.clienteMapper.toDomainRole(cliente.role),
            });
        }
    }
    async findById(id) {
        console.log(`procurando cliente com id: ${id}`);
        const cliente = await this.prismaClient.cliente.findUnique({
            where: { id: id }
        });
        if (!cliente) {
            console.log(`Cliente com id: ${id} não encontrado`);
            throw new Error("Cliente com id informado não encontrado");
        }
        console.log(`Cliente encontrado com id: ${id}`);
        const clienteAchado = cliente_1.Cliente.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            numero: cliente.numero,
            senha: cliente.senha,
            role: cliente_mapper_1.clienteMapper.toDomainRole(cliente.role)
        });
        console.log(`Cliente mapeado: ${JSON.stringify(clienteAchado)}`);
        return clienteAchado;
    }
    async update(cliente) {
        try {
            console.log(`Tentando atualizar cliente com id: ${cliente.id}`);
            await this.prismaClient.cliente.update({
                where: { id: cliente.id },
                data: {
                    nome: cliente.nome,
                    email: cliente.email,
                    numero: cliente.numero,
                    senha: cliente.senha,
                }
            });
            console.log(`Cliente atualizado com sucesso`);
        }
        catch (error) {
            console.log(`Erro ao atualizar o cliente: ${error}`);
            throw new Error("Erro ao modificar o cliente", error);
        }
    }
    async delete(id) {
        console.log(`Tentando deletar cliente com id: ${id}`);
        try {
            await this.prismaClient.cliente.delete({
                where: { id: id }
            });
            console.log(`Cliente deletado com sucesso`);
        }
        catch (error) {
            console.log(`Erro ao deletar o cliente: ${error}`);
            throw new Error("Erro ao deletar usuário", error);
        }
    }
}
exports.ClienteRepository = ClienteRepository;
