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
        await this.servicoGateway.delete(input.id);
        return;
    }
}
exports.DeleteServicoUsecase = DeleteServicoUsecase;
