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
        return new LoginClienteRoute("/api/clientes/auth", routes_1.HttpMethod.POST, loginClienteService);
    }
    getHandler() {
        return async (request, response) => {
            try {
                console.log("Requisição recebida em /api/clientes/auth", request.body);
                const { email, senha } = request.body;
                console.log("Iniciando login com email:", email);
                const output = await this.loginClienteService.execute({ email, senha });
                console.log("Login realizado com sucesso:", output);
                response.status(200).json(output);
            }
            catch (error) {
                console.error("Erro no login:", error.message, error.stack);
                response.status(401).json({ message: error.message || "Falha na autenticação" });
            }
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
