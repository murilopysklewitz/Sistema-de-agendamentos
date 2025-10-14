"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    accessTokenSecret;
    refreshTokenSecret;
    accessTokenExpiration;
    refreshTokenExpiration;
    constructor() {
        this.accessTokenSecret = process.env.JWT_ACCESS_SECRET || 'default-secret';
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'default-secret';
        this.accessTokenExpiration = process.env.JWT_ACCESS_EXPIRATION || '15m';
        this.refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';
    }
    generateAcessToken(payload) {
        const generateAcess = jsonwebtoken_1.default.sign({
            clienteId: payload.clienteId,
            email: payload.email,
            role: payload.role
        }, this.accessTokenSecret, {
            expiresIn: this.accessTokenExpiration,
            subject: payload.clienteId
        });
        return generateAcess;
    }
    generateRefreshToken(payload) {
        const refreshToken = jsonwebtoken_1.default.sign({
            clienteId: payload.clienteId,
            email: payload.email,
            role: payload.role
        }, this.refreshTokenSecret, {
            expiresIn: this.accessTokenExpiration,
            subject: payload.clienteId
        });
        return refreshToken;
    }
    verifyAccessToken(token) {
        try {
            const verifyToken = jsonwebtoken_1.default.verify(token, this.accessTokenSecret);
            return verifyToken;
        }
        catch (error) {
            throw new Error("erro inesperado ao verificar Token");
        }
    }
    verifyRefreshToken(token) {
        try {
            const verifyRefresh = jsonwebtoken_1.default.verify(token, this.refreshTokenSecret);
            return verifyRefresh;
        }
        catch (error) {
            throw new Error("Erro inesperado ao verificar refresh Token");
        }
    }
}
exports.JWTService = JWTService;
