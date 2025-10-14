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
const createAgendamento_usecase_1 = require("./usecases/agendamento.usecases/createAgendamento.usecase");
const agendamento_repository_prisma_1 = require("./infra/repositories/agendamento/agendamento.repository,prisma");
const agendamento_mapper_1 = require("./infra/database/prisma/mappers/agendamento.mapper");
const agendamento_validator_service_1 = require("./domain/agendamento/service/agendamento-validator.service");
const create_agendamento_express_route_1 = require("./infra/api/express/routes/agendamentos/create-agendamento.express.route");
const cliente_repository_prisma_1 = require("./infra/repositories/cliente/cliente.repository.prisma");
const createCliente_usecase_1 = require("./usecases/cliente.usecases/createCliente.usecase");
const create_cliente_express_route_1 = require("./infra/api/express/routes/clientes/create-cliente.express.route");
const findById_usecase_1 = require("./usecases/cliente.usecases/findById.usecase");
const listCliente_usecase_1 = require("./usecases/cliente.usecases/listCliente.usecase");
const deleteCliente_usecase_1 = require("./usecases/cliente.usecases/deleteCliente.usecase");
const findById_agendamento_express_route_1 = require("./infra/api/express/routes/agendamentos/findById-agendamento.express.route");
const list_agendamento_express_route_1 = require("./infra/api/express/routes/agendamentos/list-agendamento.express.route");
const findByInterval_agendamento_express_route_1 = require("./infra/api/express/routes/agendamentos/findByInterval-agendamento.express.route");
const findById_cliente_express_route_1 = require("./infra/api/express/routes/clientes/findById-cliente.express.route");
const list_cliente_express_route_1 = require("./infra/api/express/routes/clientes/list-cliente.express.route");
const delete_cliente_express_route_1 = require("./infra/api/express/routes/clientes/delete-cliente.express.route");
const findByEmail_usecase_1 = require("./usecases/cliente.usecases/findByEmail.usecase");
const findByEmail_express_route_1 = require("./infra/api/express/routes/clientes/findByEmail.express.route");
const loginCliente_usecase_1 = require("./usecases/cliente.usecases/loginCliente.usecase");
const BcryptPasswordHasher_1 = require("./infra/security/BcryptPasswordHasher");
const JWTService_1 = require("./infra/security/JWTService");
const login_cliente_express_route_1 = require("./infra/api/express/routes/clientes/login-cliente.express.route");
const auth_middleware_1 = require("./infra/api/express/middlewares/auth.middleware");
const Role_middleware_1 = require("./infra/api/express/middlewares/Role.middleware");
const findByIdAgendamentos_usecase_1 = require("./usecases/agendamento.usecases/findByIdAgendamentos.usecase");
const listAgendamento_usecase_1 = require("./usecases/agendamento.usecases/listAgendamento.usecase");
const findByIntervalAgendamento_Usecase_1 = require("./usecases/agendamento.usecases/findByIntervalAgendamento.Usecase");
const ValidationMiddleware_1 = require("./infra/api/express/middlewares/ValidationMiddleware");
const createCliente_dto_1 = require("./usecases/cliente.usecases/createCliente.dto");
function main() {
    const mapper = new agendamento_mapper_1.AgendamentoMapperPrisma();
    const aRepository = servico_repository_prisma_1.ServicoRepositoryPrisma.create(prisma_1.prisma);
    const aRepositoryClientes = cliente_repository_prisma_1.ClienteRepository.create(prisma_1.prisma);
    const aRepositoryAgendamentos = agendamento_repository_prisma_1.AgendamentoRepository.create(prisma_1.prisma, mapper);
    const vallidator = agendamento_validator_service_1.AgendamentoValidatorService.create(aRepositoryAgendamentos);
    const passwordHasher = new BcryptPasswordHasher_1.BcryptPasswordHasher(10);
    const jwtService = new JWTService_1.JWTService();
    const authMiddleware = new auth_middleware_1.AuthMiddleware(jwtService);
    // CRUD de usecase para serviços
    const findByIdServicoUsecase = findByIdServico_usecase_1.FindByIdServicoUsecase.create(aRepository);
    const updateServicoUsecase = updateServico_usecase_1.UpdateServicoUsecase.create(aRepository);
    const createServicoUseCase = createServico_usecase_1.CreateServicoUseCase.create(aRepository);
    const listServicosUseCase = listServico_usecase_1.ListServicoUsecase.create(aRepository);
    const deleteServicoUseCase = deleteServico_usecase_1.DeleteServicoUsecase.create(aRepository);
    // CRUD de usecases para clientes
    const createClienteUsecase = createCliente_usecase_1.CreateClienteUsecase.create(aRepositoryClientes, passwordHasher);
    const loginClienteUsecase = loginCliente_usecase_1.LoginClienteUsecase.create(aRepositoryClientes, passwordHasher, jwtService);
    const findByEmailClienteUsecase = findByEmail_usecase_1.FindByEmailClienteUsecase.create(aRepositoryClientes);
    const findByIdClientesUsecase = findById_usecase_1.FindByIdClienteUsecase.create(aRepositoryClientes);
    const listClientesUsecase = listCliente_usecase_1.ListClienteUsecase.create(aRepositoryClientes);
    const deleteClientesUsecase = deleteCliente_usecase_1.DeleteClienteUsecase.create(aRepositoryClientes);
    //CRUD de usecase para agendamentos
    const createAgendamentoUsecase = createAgendamento_usecase_1.CreateAgendamentoUsecase.create(aRepositoryAgendamentos, vallidator, aRepository, aRepositoryClientes);
    const findAgendamentoUsecase = findByIdAgendamentos_usecase_1.FindByIdAgendamentoUsecase.create(aRepositoryAgendamentos);
    const listAgendamentoUsecase = listAgendamento_usecase_1.ListAgendamentoUsecase.create(aRepositoryAgendamentos);
    const findByIntervalAgendamentoUsecase = findByIntervalAgendamento_Usecase_1.FindByIntervalAgendamentoUsecase.create(aRepositoryAgendamentos);
    // CRUD de rotas para serviços
    const findByIdServicoRoute = findById_servico_express_route_1.FindByIdServicoRoute.create(findByIdServicoUsecase);
    const updateServicoRoute = update_servico_express_route_1.UpdateServicoRoute.create(updateServicoUsecase);
    const createServicoRoute = create_servico_express_route_1.CreateServicoRoute.create(createServicoUseCase, [authMiddleware, Role_middleware_1.RoleMiddleware.onlyAdmin()]);
    const listServicoRoute = list_product_express_route_1.ListServicosRoute.create(listServicosUseCase);
    const deleteServicoRoute = delete_servico_express_route_1.DeleteServicoRoute.create(deleteServicoUseCase);
    //CRUD de rotas para agendamentos
    const createAgendamentoRoute = create_agendamento_express_route_1.CreateAgendamentoRoute.create(createAgendamentoUsecase, [authMiddleware, Role_middleware_1.RoleMiddleware.onlyAdmin()]);
    const findByIntervalAgendamentoRoute = findByInterval_agendamento_express_route_1.FindByIntervalAgendamentoRoute.create(findByIntervalAgendamentoUsecase);
    const findByIdAgendamentosRoute = findById_agendamento_express_route_1.FindByIdAgendamentoRoute.create(findAgendamentoUsecase);
    const listAgendamentoRoute = list_agendamento_express_route_1.ListAgendamentoRoute.create(listAgendamentoUsecase);
    // CRUD de rotas de Clientes 
    const createClienteRoute = create_cliente_express_route_1.CreateClienteRoute.create(createClienteUsecase, [ValidationMiddleware_1.ValidationMiddleware.for(createCliente_dto_1.CreateClienteDto)]);
    const loginClienteRoute = login_cliente_express_route_1.LoginClienteRoute.create(loginClienteUsecase);
    const findByEmailClienteRoute = findByEmail_express_route_1.FindByEmailClienteRoute.create(findByEmailClienteUsecase);
    const findByIdClienteRoute = findById_cliente_express_route_1.FindByIdClienteRoute.create(findByIdClientesUsecase);
    const listClienteRoute = list_cliente_express_route_1.ListClienteRoute.create(listClientesUsecase);
    const deleteClienteRoute = delete_cliente_express_route_1.DeleteClienteRoute.create(deleteClientesUsecase);
    const PORT = 3000;
    const api = api_express_1.ApiExpress.create([
        //rotas de serviço
        createServicoRoute, updateServicoRoute, findByIdServicoRoute, deleteServicoRoute, listServicoRoute,
        //rotas de agendamentos
        createAgendamentoRoute, findByIntervalAgendamentoRoute, findByIdAgendamentosRoute, listAgendamentoRoute,
        //rotas de cliente
        createClienteRoute, loginClienteRoute, findByEmailClienteRoute, findByIdClienteRoute, listClienteRoute, deleteClienteRoute,
    ]);
    api.start(PORT);
}
main();
