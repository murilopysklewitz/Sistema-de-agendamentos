"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createServico_usecase_1 = require("./createServico.usecase");
jest.mock('crypto', () => ({
    randomUUID: jest.fn().mockReturnValueOnce('mock-uuid-123')
}));
describe('CreateServicoUsecase', () => {
    let servicoGatewayMock;
    let usecase;
    beforeEach(() => {
        servicoGatewayMock = {
            save: jest.fn(),
            list: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        };
        usecase = createServico_usecase_1.CreateServicoUseCase.create(servicoGatewayMock);
    });
    it("Should create a service Sucessfully", async () => {
        const input = {
            nome: "Corte de cachorro",
            preco: 50,
            descricao: "corte e tosa",
            destaque: true,
            duracaoEmMinutos: 60,
        };
        servicoGatewayMock.save.mockResolvedValue('mock-uuid-123');
        const output = await usecase.execute(input);
        expect(servicoGatewayMock.save).toHaveBeenCalledTimes(1);
        expect(servicoGatewayMock.save).toHaveBeenCalledWith(expect.objectContaining({
            nome: input.nome,
            preco: input.preco,
            descricao: input.descricao,
            destaque: input.destaque,
            duracaoEmMinutos: input.duracaoEmMinutos,
        }));
        expect(output).toEqual({
            id: 'mock-uuid-123'
        });
    });
    it('should throw an error for an invalid price', async () => {
        const input = {
            nome: 'Serviço com Preço Inválido',
            preco: -10,
            descricao: 'Descrição',
            destaque: false,
            duracaoEmMinutos: 30,
        };
        await expect(usecase.execute(input)).rejects.toThrow('Preço do serviço deve ser positivo.');
        expect(servicoGatewayMock.save).toHaveBeenCalledTimes(0);
    });
    it('should throw an error for an invalid duration', async () => {
        const input = {
            nome: 'Serviço com Duração Inválida',
            preco: 150,
            descricao: 'Descrição',
            destaque: true,
            duracaoEmMinutos: 0,
        };
        await expect(usecase.execute(input)).rejects.toThrow('Duração do serviço deve ser um número positivo.');
        expect(servicoGatewayMock.save).toHaveBeenCalledTimes(0);
    });
});
