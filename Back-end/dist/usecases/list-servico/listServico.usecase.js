"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListServicoUsecase = void 0;
class ListServicoUsecase {
    servicoGateway;
    constructor(servicoGateway) {
        this.servicoGateway = servicoGateway;
    }
    static create(servicoGateway) {
        return new ListServicoUsecase(servicoGateway);
    }
    async execute(input) {
        const aServico = await this.servicoGateway.list();
        const output = this.presentOutput(aServico);
        return output;
    }
    presentOutput(servicos) {
        return {
            servicos: servicos.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    description: p.description,
                    highlight: p.highlight
                };
            })
        };
    }
}
exports.ListServicoUsecase = ListServicoUsecase;
