"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicoUseCase = void 0;
const servico_1 = require("../../domain/servico/entity/servico");
class CreateServicoUseCase {
    servicoGateway;
    constructor(servicoGateway) {
        this.servicoGateway = servicoGateway;
    }
    static create(servicoGateway) {
        return new CreateServicoUseCase(servicoGateway);
    }
    async execute({ name, price }) {
        const aServico = servico_1.Servico.create(name, price);
        await this.servicoGateway.save(aServico);
        const output = this.presentOutput(aServico);
        return output;
    }
    presentOutput(servico) {
        const output = {
            id: servico.id
        };
        return output;
    }
}
exports.CreateServicoUseCase = CreateServicoUseCase;
