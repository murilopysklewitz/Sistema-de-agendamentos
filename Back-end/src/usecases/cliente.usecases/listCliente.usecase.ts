import { Cliente, ClienteRole } from "../../domain/cliente/entity/cliente";
import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway";

export type ListClienteInputDto = void;
export type ListClienteOutputDto = {
    clientes: {
        id: string,
        nome: string,
        email: string,
        numero: string,
        senha: string,
        role: ClienteRole
    }[]
}

export class ListClienteUsecase {
    private constructor(private readonly clienteGateway: ClienteGateway){}

    public static create(clienteGateway: ClienteGateway) {
        return new ListClienteUsecase(clienteGateway)
    }

    public async execute(): Promise<ListClienteOutputDto> {
        const clientes = await this.clienteGateway.list()
        const output = this.presentOutput(clientes)
        return output


    }

    public presentOutput(clientes: Cliente[]): ListClienteOutputDto {
        return{
            clientes: clientes.map(p => ({
                id: p.id,
                nome: p.nome,
                email: p.email,
                numero: p.numero,
                senha: p.senha,
                role: p.role
            }))
        }
    }
}