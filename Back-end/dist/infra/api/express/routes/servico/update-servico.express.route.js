"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServicoRoute = void 0;
const routes_1 = require("../routes");
class UpdateServicoRoute {
    path;
    HttpMethod;
    updateServicoService;
    constructor(path, HttpMethod, updateServicoService) {
        this.path = path;
        this.HttpMethod = HttpMethod;
        this.updateServicoService = updateServicoService;
    }
    static create(updateServicoService) {
        return new UpdateServicoRoute("/servicos/:id", routes_1.HttpMethod.PUT, updateServicoService);
    }
    getHandler() {
        return async (request, response) => {
            const { id } = request.params;
            const { nome, preco, descricao, destaque, duracaoEmMinutos } = request.body;
            if (!id) {
                throw new Error("ID de serviço é obrigatório");
            }
            const input = {
                id,
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos,
            };
            try {
                const output = await this.updateServicoService.execute(input);
                response.status(200).json(input).send();
            }
            catch (error) {
                console.error("Erro em updateServicoRoute", error.message);
                if (error.message.includes("obrigatório") || error.message.includes("negativo") || error.message.includes("vazio")) {
                    response.status(400).json({ message: error.message }).send();
                }
                else {
                    response.status(500).json({ message: "Erro interno do servidor." }).send();
                }
            }
        };
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.HttpMethod;
    }
}
exports.UpdateServicoRoute = UpdateServicoRoute;
