"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServicoUsecase = void 0;
class UpdateServicoUsecase {
    servicoGateway;
    constructor(servicoGateway) {
        this.servicoGateway = servicoGateway;
    }
    static create(servicoGateway) {
        return new UpdateServicoUsecase(servicoGateway);
    }
    async execute({ id, nome, preco, descricao, destaque, duracaoEmMinutos }) {
        try {
            const servicoExistente = await this.servicoGateway.findById(id);
            if (!servicoExistente) {
                throw new Error("deve passar o ID");
            }
            servicoExistente.update(nome, preco, descricao, destaque, duracaoEmMinutos);
            await this.servicoGateway.update(servicoExistente);
        }
        catch (error) {
            console.error("Erro no UpdateServico:", error.message);
        }
    }
}
exports.UpdateServicoUsecase = UpdateServicoUsecase;
