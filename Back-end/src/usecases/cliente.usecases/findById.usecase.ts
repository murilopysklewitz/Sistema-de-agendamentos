import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway"
import { Usecase } from "../../usecases/usecase"
import { Cliente } from "../../domain/cliente/entity/cliente"

export type FindByIdClienteInputDto = {
    id: string
}

export type FindByIdClienteOutputDto = {
    cliente : {
        id: string,
        nome:string,
        email:string,
        numero:string,
        senha: string
    }
}

export class FindByIdClienteUsecase implements Usecase<FindByIdClienteInputDto, FindByIdClienteOutputDto> {
    private constructor(private readonly clienteGateway: ClienteGateway){}

    public static create(clienteGateway: ClienteGateway){
        return new FindByIdClienteUsecase(clienteGateway)
    }

    public async execute({id}: FindByIdClienteInputDto): Promise<FindByIdClienteOutputDto> {
        const aCliente = await this.clienteGateway.findById(id)
        const output = this.presentOutput(aCliente)
        return output
    }

    public presentOutput(cliente: Cliente): FindByIdClienteOutputDto {
        return {
            cliente: Cliente.with ({
                id: cliente.id,
                nome:cliente.nome,
                email:cliente.email,
                numero:cliente.numero,
                senha: cliente.senha
            })
        }
    }
}