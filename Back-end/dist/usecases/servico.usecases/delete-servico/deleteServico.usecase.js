"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteServicoUsecase = void 0;
class DeleteServicoUsecase {
    servicoGateway;
    constructor(servicoGateway) {
        this.servicoGateway = servicoGateway;
    }
    static create(servicoGateway) {
        return new DeleteServicoUsecase(servicoGateway);
    }
    async execute(input) {
        if (!input.id) {
            throw new Error("ID do serviço é obrigatório para deleção.");
        }
        const servicoExistente = await this.servicoGateway.findById(input.id);
        if (!servicoExistente) {
            throw new Error(`Serviço com ID ${input.id} não encontrado para deleção.`);
        }
        await this.servicoGateway.delete(input.id);
        return;
    }
}
exports.DeleteServicoUsecase = DeleteServicoUsecase;
