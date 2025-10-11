import { ITokenService } from "../../../../domain/cliente/services/ITokenService";
import { IMiddleware } from "./IMiddleware";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware implements IMiddleware {
    constructor(private readonly tokenService: ITokenService) {}

    public handle(request: Request, response: Response, next: NextFunction): void {
        const authHeader = request.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            response.status(401).json({ message: "Token ausente" });
            return;
        }

        const token = authHeader.split(" ")[1];
        console.log(' Token extraído:', token.substring(0, 20) + '...');

        try {
            const payload = this.tokenService.verifyAccessToken(token);
            console.log(' Payload verificado:', payload);
            request.user = payload;
            next();
        } catch (error) {
            response.status(401).json({ message: "Token inválido" });
        }
    }
}