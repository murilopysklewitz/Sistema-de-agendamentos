"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginClienteUsecase = void 0;
class LoginClienteUsecase {
    clienteGateway;
    passwordHasher;
    tokenService;
    constructor(clienteGateway, passwordHasher, tokenService) {
        this.clienteGateway = clienteGateway;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
    }
    static create(clienteGateway, passwordHasher, tokenService) {
        return new LoginClienteUsecase(clienteGateway, passwordHasher, tokenService);
    }
    async execute({ email, senha, role }) {
        try {
            const cliente = await this.clienteGateway.findByEmail(email);
            if (!cliente) {
                throw new Error("Não foi possível achar cliente");
            }
            const senhaValida = await this.passwordHasher.compare(senha, cliente.senha);
            if (!senhaValida) {
                throw new Error("Credenciais inválidas");
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
            });
            return { accessToken, refreshToken };
        }
        catch (error) {
            throw new Error("Não foi possivel executar Login");
        }
    }
}
exports.LoginClienteUsecase = LoginClienteUsecase;
