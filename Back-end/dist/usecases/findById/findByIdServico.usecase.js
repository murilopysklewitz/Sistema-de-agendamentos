"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdServicoUsecase = void 0;
class FindByIdServicoUsecase {
    servicoGateway;
    constructor(servicoGateway) {
        this.servicoGateway = servicoGateway;
    }
    static create(servicoGateway) {
        return new FindByIdServicoUsecase(servicoGateway);
    }
    async execute(input) {
        const aServico = await this.servicoGateway.findById(input.id);
        if (!aServico) {
            throw new Error(`Serviço com ID ${input.id} não foi encontrado`);
        }
        const output = {
            servico: {
                id: aServico.id,
                nome: aServico.nome,
                preco: aServico.preco,
                descricao: aServico.descricao,
                destaque: aServico.destaque,
                horasDeServico: aServico.horasDeServico
            }
        };
        return output;
    }
}
exports.FindByIdServicoUsecase = FindByIdServicoUsecase;
