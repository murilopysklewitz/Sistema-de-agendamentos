import { ITokenService, TokenPayload } from "../../domain/cliente/services/ITokenService";
import jwt from 'jsonwebtoken'

export class JWTService implements ITokenService {
        private readonly accessTokenSecret: string
        private readonly refreshTokenSecret: string
        private readonly accessTokenExpiration: string
        private readonly refreshTokenExpiration: string

    constructor() {
        this.accessTokenSecret = process.env.JWT_ACCESS_SECRET || 'default-secret';
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'default-secret';
        this.accessTokenExpiration = process.env.JWT_ACCESS_EXPIRATION || '15m';
        this.refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';
    }

    public generateAcessToken(payload: TokenPayload): string {
        const generateAcess = jwt.sign(
            {
            clienteId: payload.clienteId,
            email: payload.email,
            role: payload.role
            },
            this.accessTokenSecret,
            {
            expiresIn: this.accessTokenExpiration,
            subject:payload.clienteId
            } as jwt.SignOptions
        )
        return generateAcess
    }

    public generateRefreshToken(payload: TokenPayload): string {
        const refreshToken = jwt.sign(
            {
                clienteId: payload.clienteId,
                email: payload.email,
                role: payload.role
            },
            this.refreshTokenSecret,
            {
                expiresIn: this.accessTokenExpiration,
                subject: payload.clienteId
            }  as jwt.SignOptions   
        )
        return refreshToken
    }

    public verifyAccessToken(token: string): TokenPayload {
        try{
        const verifyToken = jwt.verify(token, this.accessTokenSecret) as TokenPayload
        return verifyToken
        }catch(error: any) {
            throw new Error("erro inesperado ao verificar Token")
        }
    }

    public verifyRefreshToken(token: string): TokenPayload {
        try {
            const verifyRefresh = jwt.verify(token, this.refreshTokenSecret) as TokenPayload
            return verifyRefresh
        } catch(error: any) {
            throw new Error("Erro inesperado ao verificar refresh Token")
        }
    }
}