"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const servico_repository_prisma_1 = require("./infra/repositories/servico/servico.repository.prisma");
const prisma_1 = require("./infra/database/prisma/prisma");
const findByIdServico_usecase_1 = require("./usecases/servico.usecases/findById-servico/findByIdServico.usecase");
const createServico_usecase_1 = require("./usecases/servico.usecases/create-servico/createServico.usecase");
const listServico_usecase_1 = require("./usecases/servico.usecases/list-servico/listServico.usecase");
const deleteServico_usecase_1 = require("./usecases/servico.usecases/delete-servico/deleteServico.usecase");
const findById_servico_express_route_1 = require("./infra/api/express/routes/servico/findById-servico.express.route");
const create_servico_express_route_1 = require("./infra/api/express/routes/servico/create-servico.express.route");
const list_product_express_route_1 = require("./infra/api/express/routes/servico/list-product.express.route");
const delete_servico_express_route_1 = require("./infra/api/express/routes/servico/delete-servico.express.route");
const api_express_1 = require("./infra/api/express/routes/api.express");
const updateServico_usecase_1 = require("./usecases/servico.usecases/update-servico/updateServico.usecase");
const update_servico_express_route_1 = require("./infra/api/express/routes/servico/update-servico.express.route");
const createAgendamento_usecase_1 = require("./usecases/agendamento.usecases/create-agendamento/createAgendamento.usecase");
const agendamento_repository_prisma_1 = require("./infra/repositories/agendamento/agendamento.repository,prisma");
const agendamento_mapper_1 = require("./infra/database/prisma/mappers/agendamento.mapper");
const agendamento_validator_service_1 = require("./domain/agendamento/service/agendamento-validator.service");
const create_agendamento_express_route_1 = require("./infra/api/express/routes/agendamentos/create-agendamento.express.route");
const cliente_repository_prisma_1 = require("./infra/repositories/cliente/cliente.repository.prisma");
const createCliente_usecase_1 = require("./usecases/cliente.usecases/createCliente.usecase");
const create_cliente_express_route_1 = require("./infra/api/express/routes/clientes/create-cliente.express.route");
function main() {
    const mapper = new agendamento_mapper_1.AgendamentoMapperPrisma();
    const aRepository = servico_repository_prisma_1.ServicoRepositoryPrisma.create(prisma_1.prisma);
    const aRepositoryClientes = cliente_repository_prisma_1.ClienteRepository.create(prisma_1.prisma);
    const aRepositoryAgendamentos = agendamento_repository_prisma_1.AgendamentoRepository.create(prisma_1.prisma, mapper);
    const vallidator = agendamento_validator_service_1.AgendamentoValidatorService.create(aRepositoryAgendamentos);
    // CRUD de usecase para serviços
    const findByIdServicoUsecase = findByIdServico_usecase_1.FindByIdServicoUsecase.create(aRepository);
    const updateServicoUsecase = updateServico_usecase_1.UpdateServicoUsecase.create(aRepository);
    const createServicoUseCase = createServico_usecase_1.CreateServicoUseCase.create(aRepository);
    const listServicosUseCase = listServico_usecase_1.ListServicoUsecase.create(aRepository);
    const deleteServicoUseCase = deleteServico_usecase_1.DeleteServicoUsecase.create(aRepository);
    // CRUD de usecases para clientes
    const createClienteUsecase = createCliente_usecase_1.CreateClienteUsecase.create(aRepositoryClientes);
    //CRUD de usecase para agendamentos
    const createAgendamentoUsecase = createAgendamento_usecase_1.CreateAgendamentoUsecase.create(aRepositoryAgendamentos, vallidator, aRepository, aRepositoryClientes);
    // CRUD de rotas para serviços
    const findByIdServicoRoute = findById_servico_express_route_1.FindByIdServicoRoute.create(findByIdServicoUsecase);
    const updateServicoRoute = update_servico_express_route_1.UpdateServicoRoute.create(updateServicoUsecase);
    const createServicoRoute = create_servico_express_route_1.CreateServicoRoute.create(createServicoUseCase);
    const listServicoRoute = list_product_express_route_1.ListServicosRoute.create(listServicosUseCase);
    const deleteServicoRoute = delete_servico_express_route_1.DeleteServicoRoute.create(deleteServicoUseCase);
    //CRUD de rotas para agendamentos
    const createAgendamentoRoute = create_agendamento_express_route_1.CreateAgendamentoRoute.create(createAgendamentoUsecase);
    // CRUD de rotas de Clientes 
    const createClienteRoute = create_cliente_express_route_1.CreateClienteRoute.create(createClienteUsecase);
    const PORT = 3000;
    const api = api_express_1.ApiExpress.create([
        //rotas de serviço
        createServicoRoute, updateServicoRoute, findByIdServicoRoute, deleteServicoRoute, listServicoRoute,
        //rotas de agendamentos
        createAgendamentoRoute,
        //rotas de cliente
        createClienteRoute
    ]);
    api.start(PORT);
}
main();
