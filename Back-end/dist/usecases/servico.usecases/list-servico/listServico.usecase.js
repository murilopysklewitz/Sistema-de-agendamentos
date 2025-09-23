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
    async execute() {
        try {
            const aServico = await this.servicoGateway.list();
            if (!aServico) {
                throw new Error("Não foi possivel achar esse serviço");
            }
            const output = this.presentOutput(aServico);
            return output;
        }
        catch (error) {
            throw new Error("Erro em listServicoUsecase", error);
            throw error;
        }
    }
    presentOutput(servicos) {
        return {
            servicos: servicos.map((p) => {
                return {
                    id: p.id,
                    nome: p.nome,
                    preco: p.preco,
                    descricao: p.descricao,
                    destaque: p.destaque,
                    duracaoEmMinutos: p.duracaoEmMinutos
                };
            })
        };
    }
}
exports.ListServicoUsecase = ListServicoUsecase;
