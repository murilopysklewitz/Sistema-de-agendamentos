import { IPasswordHasher } from "domain/cliente/services/IPasswordHasher"
import { Cliente } from "../../domain/cliente/entity/cliente"
import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway"
import { Usecase } from "../../usecases/usecase"

export type CreateClienteInputDto = {
    nome: string,
    email: string,
    numero: string,
    senha: string
}

export type CreateClienteOutputDto = {
    id: string
}

export class CreateClienteUsecase implements Usecase<CreateClienteInputDto, CreateClienteOutputDto> {
    private constructor(private readonly clienteGateway: ClienteGateway, private readonly passwordHasher: IPasswordHasher) {}

    public static create(clienteGateway: ClienteGateway, passwordHasher: IPasswordHasher) {
        return new CreateClienteUsecase(clienteGateway, passwordHasher)
    }

    public async execute({nome, email, numero, senha}: CreateClienteInputDto): Promise<CreateClienteOutputDto> {
        const existingCliente = await this.clienteGateway.findByEmail(email);
        if (existingCliente) {
            throw new Error("Email já cadastrado");
        }
        if (senha.length < 8) {
            throw new Error("A senha deve ter no mínimo 8 caracteres");
        }

        const hashedPassword = await this.passwordHasher.hash(senha);

        const cliente = Cliente.create(
            nome,
            email,
            numero,
            hashedPassword 
        );

        await this.clienteGateway.save(cliente);

        return {
            id: cliente.id,
        }
    }

    private presentOutput(cliente: Cliente): CreateClienteOutputDto {
                const output:CreateClienteOutputDto = {
                    id:cliente.id
                }
                return output;
    }
}