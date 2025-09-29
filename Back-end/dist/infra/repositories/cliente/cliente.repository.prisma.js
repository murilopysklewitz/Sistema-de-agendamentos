"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const cliente_1 = require("../../../domain/cliente/entity/cliente");
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
            const data = {
                nome: cliente.nome,
                email: cliente.email,
                numero: cliente.numero,
                senha: cliente.senha
            };
            await this.prismaClient.cliente.upsert({
                where: { id: cliente.id },
                update: data,
                create: data
            });
            return cliente.id;
        }
        catch (error) {
            throw new Error("Não foi possivel salvar cliente no banco de dados");
        }
    }
    async list() {
        try {
            const clientes = await this.prismaClient.cliente.findMany();
            const clienteList = clientes.map((p) => {
                const cliente = cliente_1.Cliente.with({
                    id: p.id,
                    nome: p.nome,
                    email: p.email,
                    numero: p.numero,
                    senha: p.senha
                });
                return cliente;
            });
            return clienteList;
        }
        catch (error) {
            throw new Error("Não foi possível listar os clientes", error);
        }
    }
    async findByEmail(email) {
        const cliente = await this.prismaClient.cliente.findUnique({
            where: { email }
        });
        if (!cliente) {
            throw new Error(`não foi possivel achar por Email`);
        }
        ;
        const clienteAchado = cliente_1.Cliente.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            numero: cliente.numero,
            senha: cliente.senha
        });
        return clienteAchado;
    }
    async findById(id) {
        const cliente = await this.prismaClient.cliente.findUnique({
            where: { id: id }
        });
        if (!cliente) {
            throw new Error("Cliente com id informado não encontrado");
        }
        const clienteAchado = cliente_1.Cliente.with({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            numero: cliente.numero,
            senha: cliente.senha
        });
        return clienteAchado;
    }
    async update(cliente) {
        try {
            await this.prismaClient.cliente.update({
                where: { id: cliente.id },
                data: {
                    nome: cliente.nome,
                    email: cliente.email,
                    numero: cliente.numero,
                    senha: cliente.senha
                }
            });
        }
        catch (error) {
            throw new Error("Erro ao modificar o cliente", error);
        }
    }
    async delete(id) {
        try {
            await this.prismaClient.cliente.delete({
                where: { id: id }
            });
        }
        catch (error) {
            throw new Error("Erro ao deletar usuário");
        }
    }
}
exports.ClienteRepository = ClienteRepository;
