import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway";
import { Usecase } from "../../usecases/usecase";

export type DeleteClienteInputDto = {
    id: string
}
export type DeleteClienteOutputDto = void;


export class DeleteClienteUsecase implements Usecase<DeleteClienteInputDto, DeleteClienteOutputDto>{
    private constructor(private readonly clienteGateway: ClienteGateway) {}

    public static create(clienteGateway: ClienteGateway) {
        return new DeleteClienteUsecase(clienteGateway)
    }

    public async execute({id}: DeleteClienteInputDto): Promise<void> {
        const cliente = await this.clienteGateway.findById(id)

        await this.clienteGateway.delete(cliente.id)
    }
}