import { Cliente } from "domain/cliente/entity/cliente"
import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway"
import { Usecase } from "../../usecases/usecase"

export type CreateClienteInputDto = {
    nome: string,
    email: string,
    numero: string
}

export type CreateClienteOutputDto = {
    id: string
}

export class CreateClienteUsecase implements Usecase<CreateClienteInputDto, CreateClienteOutputDto> {
    private constructor(private readonly clienteGateway: ClienteGateway) {}

    public static create(clienteGateway: ClienteGateway) {
        return new CreateClienteUsecase(clienteGateway)
    }

    public async execute({nome, email, numero}: CreateClienteInputDto): Promise<CreateClienteOutputDto> {
        const aCliente = Cliente.create(nome, email, numero)

        await this.clienteGateway.save(aCliente)
        const output = this.presentOutput(aCliente)
        return output
    }

    private presentOutput(cliente: Cliente): CreateClienteOutputDto {
                const output:CreateClienteOutputDto = {
                    id:cliente.id
                }
                return output;
    }
}