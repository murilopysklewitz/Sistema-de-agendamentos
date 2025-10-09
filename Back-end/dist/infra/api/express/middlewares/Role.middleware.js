"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMiddleware = void 0;
const cliente_1 = require("../../../../domain/cliente/entity/cliente");
class RoleMiddleware {
    allowedRoles;
    constructor(allowedRoles) {
        this.allowedRoles = allowedRoles;
    }
    handle(request, response, next) {
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
    static onlyAdmin() {
        return new RoleMiddleware([cliente_1.ClienteRole.ADMIN]);
    }
    static onlyCliente() {
        return new RoleMiddleware([cliente_1.ClienteRole.CLIENTE]);
    }
    static adminOrCliente() {
        return new RoleMiddleware([cliente_1.ClienteRole.ADMIN, cliente_1.ClienteRole.CLIENTE]);
    }
}
exports.RoleMiddleware = RoleMiddleware;
