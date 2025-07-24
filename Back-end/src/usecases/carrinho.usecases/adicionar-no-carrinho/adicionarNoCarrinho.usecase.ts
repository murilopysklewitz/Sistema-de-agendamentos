import { CarrinhoGateway } from "src/domain/servico/gateway/carrinho.gateway";
import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway";
import { Usecase } from "src/usecases/usecase";

export type AdicionarNoCarrinhoInputDto = {
    carrinhoId:string;
    servicoId:string;
    quantidade:number;
}
export type AdicionarNoCarrinhoOutputDto = {
    carrinhoId:string;
    totalItens: number;
    valorTotal:number
};

export class AdicionarNoCarrinhoUsecase implements Usecase<AdicionarNoCarrinhoInputDto, AdicionarNoCarrinhoOutputDto> {
    private constructor(private readonly carrinhoGateway: CarrinhoGateway, servicoGateway: ServicoGateway) {}

    public static create(carrinhoGateway: CarrinhoGateway, servicoGateway: ServicoGateway): AdicionarNoCarrinhoUsecase {
        return new AdicionarNoCarrinhoUsecase(carrinhoGateway, servicoGateway)
    }
}