"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('uuid', () => ({
    v4: () => 'mock-uuid-123',
}));
describe('CreateAgendamentoUsecase', () => {
    let agendamentoGatewayMock;
    let agendamentoValidatorMock;
    let usecase;
    beforeEach(() => {
        agendamentoGatewayMock = {
            save: jest.fn(),
            list: jest.fn(),
            findById: jest.fn(),
            findByInterval: jest.fn()
        };
    });
});
