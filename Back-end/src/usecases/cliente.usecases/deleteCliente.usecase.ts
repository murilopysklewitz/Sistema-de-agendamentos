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
        console.log(`Executando DeleteClienteUsecase com id: ${id}`)

        const cliente = await this.clienteGateway.findById(id)

        console.log(`cliente achado com id: ${id}`, cliente)

        if (!cliente) {
            throw new Error(`Cliente com id: ${id} não encontrado`)
        }

        await this.clienteGateway.delete(cliente.id)

        console.log(`cliente deletado com id: ${id}`)
    }
}