import { ClienteGateway } from "../../domain/cliente/gateway/cliente.gateway"
import { IPasswordHasher } from "../../domain/cliente/services/IPasswordHasher"
import { ITokenService } from "../../domain/cliente/services/ITokenService"
import { Usecase } from "../../usecases/usecase"

export type LoginClienteInputDto = {
    email: string,
    senha: string
}
export type LoginClienteOutputDto = {
    accessToken: string,
    refreshToken: string
}

export class LoginClienteUsecase implements Usecase<LoginClienteInputDto, LoginClienteOutputDto> {
    private constructor(
        private readonly clienteGateway: ClienteGateway,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenService: ITokenService
    ) {}

    public static create(
        clienteGateway: ClienteGateway,
        passwordHasher: IPasswordHasher,
        tokenService: ITokenService
        )
        {
            return new LoginClienteUsecase(clienteGateway, passwordHasher, tokenService)
        }

    public async execute({email, senha}: LoginClienteInputDto): Promise<LoginClienteOutputDto> {
        try {
            const cliente = await this.clienteGateway.findByEmail(email)
            if(!cliente){
                throw new Error("Não foi possível achar cliente")
            }
            const senhaValida = await this.passwordHasher.compare(senha, cliente.senha)
            if(!senhaValida){
                throw new Error("Credenciais inválidas")
            }
            const accessToken = this.tokenService.generateAcessToken({
                clienteId: cliente.id,
                email: cliente.email,
                role: cliente.role
            });
            const refreshToken = this.tokenService.generateRefreshToken({
                clienteId: cliente.id,
                email: cliente.email,
                role: cliente.role
            })
            return{accessToken, refreshToken}

        }catch(error: any) {
            throw new Error("Não foi possivel executar Login")
        }
    }
}