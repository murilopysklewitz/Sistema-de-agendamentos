import { ClienteRole } from "../entity/cliente"

export interface TokenPayload {
    clienteId: string
    email: string
    role: ClienteRole
}

export interface ITokenService {
    generateAcessToken(payload: TokenPayload): string
    generateRefreshToken(payload: TokenPayload): string
    verifyAcessToken(token: string): TokenPayload
    verifyRefreshToken(token: string): TokenPayload
}