import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./IMiddleware";
import { ClienteRole } from "../../../../domain/cliente/entity/cliente";

export class RoleMiddleware implements IMiddleware {
    constructor(private readonly allowedRoles: ClienteRole[]) {}

    public handle(request: Request, response: Response, next: NextFunction): void {
        if (!request.user) {
            response.status(401).json({ message: "Não autenticado" });
            return;
        }

        const userRole = request.user.role;

        if (!this.allowedRoles.includes(userRole)) {
            response.status(403).json({ 
                message: "Acesso negado. Permissões insuficientes." 
            });
            return;
        }

        next();
    }

    static onlyAdmin(): RoleMiddleware {
        return new RoleMiddleware([ClienteRole.ADMIN]);
    }

    static onlyCliente(): RoleMiddleware {
        return new RoleMiddleware([ClienteRole.CLIENTE]);
    }

    static adminOrCliente(): RoleMiddleware {
        return new RoleMiddleware([ClienteRole.ADMIN, ClienteRole.CLIENTE]);
    }
}