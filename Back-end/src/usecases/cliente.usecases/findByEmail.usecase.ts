import { Cliente, ClienteRole } from "../../domain/cliente/entity/cliente"
import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway"
import { Usecase } from "../../usecases/usecase"

export type findByEmailClienteInputDto = {
    email: string
}
export type findByEmailClienteOutputDto = {
    cliente : {
        id: string,
        nome:string,
        email:string,
        numero:string,
        senha: string,
        role: ClienteRole
    }
    | undefined
}

export class FindByEmailClienteUsecase implements Usecase<findByEmailClienteInputDto, findByEmailClienteOutputDto | undefined>{
    private constructor(private readonly clienteGateway: ClienteGateway){}

    public static create(clienteGateway: ClienteGateway) {
        return new FindByEmailClienteUsecase(clienteGateway)
    }

    public async execute({email}: findByEmailClienteInputDto): Promise<findByEmailClienteOutputDto | undefined> {
        try {
            const cliente = await this.clienteGateway.findByEmail(email)
            if(!cliente) {
                console.log("Não foi possivel achar o cliente")
            }else{
                const output = this.presentOutput(cliente)
                return output
            }

        }catch(error: any){
            throw new Error("não foi possível achar cliente com esse email")
        }
    }

        public presentOutput(cliente: Cliente): findByEmailClienteOutputDto {
            return {
                cliente: Cliente.with ({
                    id: cliente.id,
                    nome:cliente.nome,
                    email:cliente.email,
                    numero:cliente.numero,
                    senha: cliente.senha,
                    role: cliente.role
                })
            }
        }
}