"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginClienteRoute = void 0;
const routes_1 = require("../routes");
class LoginClienteRoute {
    path;
    httpMethod;
    loginClienteService;
    constructor(path, httpMethod, loginClienteService) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.loginClienteService = loginClienteService;
    }
    static create(loginClienteService) {
        return new LoginClienteRoute("/api/cliente/auth", routes_1.HttpMethod.POST, loginClienteService);
    }
    getHandler() {
        return async (request, response) => {
            const { email, senha, role } = request.body;
            const output = await this.loginClienteService.execute({ email, senha, role });
            response.status(200);
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.httpMethod;
    }
}
exports.LoginClienteRoute = LoginClienteRoute;
