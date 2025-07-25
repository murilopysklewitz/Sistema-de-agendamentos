import { Carrinho } from "src/domain/servico/entity/carrinho";
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
    private constructor(private readonly carrinhoGateway: CarrinhoGateway, private readonly servicoGateway: ServicoGateway) {}

    public static create(carrinhoGateway: CarrinhoGateway, servicoGateway: ServicoGateway): AdicionarNoCarrinhoUsecase {
        return new AdicionarNoCarrinhoUsecase(carrinhoGateway, servicoGateway)
    }

    public async execute({carrinhoId, servicoId, quantidade}: AdicionarNoCarrinhoInputDto): Promise<AdicionarNoCarrinhoOutputDto> {
        if (quantidade <= 0) {
        throw new Error(" a quantidade para adicionar ao carrinho deve ser positiva!")
        }
        try{
            const carrinho = await this.carrinhoGateway.findById(carrinhoId)
            if (!carrinho) {
                throw new Error("Não foi possivel achar o carrinho")
            }
            const servico = await this.servicoGateway.findById(servicoId)
            if (!servico) {
                throw new Error("Não foi possivel achar o servico")
            }
            
            carrinho.adicionarServicoNoCarrinho(servico, quantidade)
            await this.carrinhoGateway.save(carrinho)

            return {
                carrinhoId: carrinho.id,
                totalItens: carrinho.totalItens,
                valorTotal: carrinho.valorTotal
            }
        }catch(error: any){
            throw new Error("erro em adicionarNoCarrinhoUsecase", error)
        }

    }
}