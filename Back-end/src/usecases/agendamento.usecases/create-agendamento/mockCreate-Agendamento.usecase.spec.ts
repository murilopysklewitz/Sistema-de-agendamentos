
import { AgendamentoGateway } from "../../../domain/agendamento/gateway/agendamento.gateway"
import { CreateAgendamentoUsecase } from "./createAgendamento.usecase"
import { AgendamentoValidator } from "../../../domain/agendamento/service/agendamento-validator.interface"

jest.mock('uuid', () => ({
    v4: () => 'mock-uuid-123',
}))

describe('CreateAgendamentoUsecase', () => {
    let agendamentoGatewayMock: jest.Mocked<AgendamentoGateway>
    let agendamentoValidatorMock: jest.Mocked<AgendamentoValidator>
    let usecase: CreateAgendamentoUsecase

    beforeEach (() => {
        agendamentoGatewayMock = {
            save: jest.fn(),
            list:jest.fn(),
            findById: jest.fn(),
            findByInterval: jest.fn()
        }
    })
})
