"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    handle(request, response, next) {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            response.status(401).json({ message: "Token ausente" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = this.tokenService.verifyAcessToken(token);
            request.user = payload;
            next();
        }
        catch (error) {
            response.status(401).json({ message: "Token inválido" });
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
