import { ServicoGateway } from "src/domain/servico/gateway/servico.gateway"
import { CreateServicoInputDto, CreateServicoUseCase } from "./createServico.usecase"

jest.mock('crypto', () => ({
    randomUUID: jest.fn().mockReturnValueOnce('mock-uuid-123')
  }));

describe('CreateServicoUsecase', () => {
    let servicoGatewayMock: jest.Mocked<ServicoGateway>
    let usecase: CreateServicoUseCase

    beforeEach(() => {
        servicoGatewayMock = {
            save: jest.fn(),
            list: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        }
        usecase = CreateServicoUseCase.create(servicoGatewayMock)
    })

    it("Should create a service Sucessfully", async () => {
        const input: CreateServicoInputDto = {
            nome:"Corte de cachorro",
            preco: 50,
            descricao: "corte e tosa",
            destaque: true,
            duracaoEmMinutos: 60,
        }

        servicoGatewayMock.save.mockResolvedValue('mock-uuid-123')

        const output = await usecase.execute(input)


        expect(servicoGatewayMock.save).toHaveBeenCalledTimes(1)

        expect(servicoGatewayMock.save).toHaveBeenCalledWith(
            expect.objectContaining({
                nome: input.nome,
                preco: input.preco,
                descricao: input.descricao,
                destaque: input.destaque,
                duracaoEmMinutos: input.duracaoEmMinutos,
            })
        )

        expect(output).toEqual({
            id: 'mock-uuid-123'
        })
    })
})