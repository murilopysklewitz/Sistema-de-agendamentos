import { ServicoRepositoryPrisma } from './infra/repositories/servico/servico.repository.prisma';
import { prisma } from './infra/database/prisma/prisma';
import { FindByIdServicoUsecase } from './usecases/servico.usecases/findById-servico/findByIdServico.usecase';
import { CreateServicoUseCase } from './usecases/servico.usecases/create-servico/createServico.usecase';
import { ListServicoUsecase } from './usecases/servico.usecases/list-servico/listServico.usecase';
import { DeleteServicoUsecase } from './usecases/servico.usecases/delete-servico/deleteServico.usecase';
import { FindByIdServicoRoute } from './infra/api/express/routes/servico/findById-servico.express.route';
import { CreateServicoRoute } from './infra/api/express/routes/servico/create-servico.express.route';
import { ListServicosRoute } from './infra/api/express/routes/servico/list-product.express.route';
import { DeleteServicoRoute } from './infra/api/express/routes/servico/delete-servico.express.route';
import { ApiExpress } from './infra/api/express/routes/api.express';
import { UpdateServicoUsecase } from './usecases/servico.usecases/update-servico/updateServico.usecase';
import { UpdateServicoRoute } from './infra/api/express/routes/servico/update-servico.express.route';
import { CreateAgendamentoUsecase } from './usecases/agendamento.usecases/createAgendamento.usecase';
import { AgendamentoRepository } from './infra/repositories/agendamento/agendamento.repository,prisma';
import { AgendamentoMapperPrisma } from './infra/database/prisma/mappers/agendamento.mapper';
import { AgendamentoValidatorService } from './domain/agendamento/service/agendamento-validator.service';
import { CreateAgendamentoRoute } from './infra/api/express/routes/agendamentos/create-agendamento.express.route';
import { ClienteRepository } from './infra/repositories/cliente/cliente.repository.prisma';
import { CreateClienteUsecase } from './usecases/cliente.usecases/createCliente.usecase';
import { CreateClienteRoute } from './infra/api/express/routes/clientes/create-cliente.express.route';
import { FindByIdClienteUsecase } from './usecases/cliente.usecases/findById.usecase';
import { ListClienteUsecase } from './usecases/cliente.usecases/listCliente.usecase';
import { DeleteClienteUsecase } from './usecases/cliente.usecases/deleteCliente.usecase';
import { FindByIdAgendamentoRoute } from './infra/api/express/routes/agendamentos/findById-agendamento.express.route';
import { ListAgendamentoRoute } from './infra/api/express/routes/agendamentos/list-agendamento.express.route';
import { FindByIntervalAgendamentoRoute } from './infra/api/express/routes/agendamentos/findByInterval-agendamento.express.route';
import { FindByIdClienteRoute } from './infra/api/express/routes/clientes/findById-cliente.express.route';
import { ListClienteRoute } from './infra/api/express/routes/clientes/list-cliente.express.route';
import { DeleteClienteRoute } from './infra/api/express/routes/clientes/delete-cliente.express.route';
import { FindByEmailClienteUsecase } from './usecases/cliente.usecases/findByEmail.usecase';
import { FindByEmailClienteRoute } from './infra/api/express/routes/clientes/findByEmail.express.route';
import { LoginClienteUsecase } from './usecases/cliente.usecases/loginCliente.usecase';
import { BcryptPasswordHasher } from './infra/security/BcryptPasswordHasher';
import { JWTService } from './infra/security/JWTService';
import { LoginClienteRoute } from './infra/api/express/routes/clientes/login-cliente.express.route';
import { AuthMiddleware } from './infra/api/express/middlewares/auth.middleware';
import { RoleMiddleware } from './infra/api/express/middlewares/Role.middleware';
import { FindByIdAgendamentoUsecase } from './usecases/agendamento.usecases/findByIdAgendamentos.usecase';
import { ListAgendamentoUsecase } from './usecases/agendamento.usecases/listAgendamento.usecase';
import { FindByIntervalAgendamentoUsecase } from './usecases/agendamento.usecases/findByIntervalAgendamento.Usecase';
import { ValidationMiddleware } from './infra/api/express/middlewares/ValidationMiddleware';
import { CreateClienteDto } from './usecases/cliente.usecases/createCliente.dto';



function main() {
     const mapper = new AgendamentoMapperPrisma()
     const aRepository = ServicoRepositoryPrisma.create(prisma);
     const aRepositoryClientes = ClienteRepository.create(prisma)
     const aRepositoryAgendamentos = AgendamentoRepository.create(prisma, mapper)
     
     const vallidator = AgendamentoValidatorService.create(aRepositoryAgendamentos)

     const passwordHasher = new BcryptPasswordHasher(10)
     const jwtService = new JWTService()

     const authMiddleware = new AuthMiddleware(jwtService)
     

     
     // CRUD de usecase para serviços
     const findByIdServicoUsecase = FindByIdServicoUsecase.create(aRepository)
     const updateServicoUsecase = UpdateServicoUsecase.create(aRepository)
     const createServicoUseCase = CreateServicoUseCase.create(aRepository);
     const listServicosUseCase = ListServicoUsecase.create(aRepository);
     const deleteServicoUseCase = DeleteServicoUsecase.create(aRepository);

     // CRUD de usecases para clientes
     const createClienteUsecase = CreateClienteUsecase.create(aRepositoryClientes, passwordHasher)
     const loginClienteUsecase = LoginClienteUsecase.create(aRepositoryClientes, passwordHasher, jwtService)
     const findByEmailClienteUsecase = FindByEmailClienteUsecase.create(aRepositoryClientes)
     const findByIdClientesUsecase = FindByIdClienteUsecase.create(aRepositoryClientes)
     const listClientesUsecase = ListClienteUsecase.create(aRepositoryClientes)
     const deleteClientesUsecase = DeleteClienteUsecase.create(aRepositoryClientes)

     //CRUD de usecase para agendamentos
     const createAgendamentoUsecase = CreateAgendamentoUsecase.create(aRepositoryAgendamentos, vallidator, aRepository, aRepositoryClientes)
     const findAgendamentoUsecase = FindByIdAgendamentoUsecase.create(aRepositoryAgendamentos)
     const listAgendamentoUsecase = ListAgendamentoUsecase.create(aRepositoryAgendamentos)
     const findByIntervalAgendamentoUsecase = FindByIntervalAgendamentoUsecase.create(aRepositoryAgendamentos)

     // CRUD de rotas para serviços
     const findByIdServicoRoute = FindByIdServicoRoute.create(findByIdServicoUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()]);
     const updateServicoRoute = UpdateServicoRoute.create(updateServicoUsecase, [authMiddleware, RoleMiddleware.adminOrCliente()])
     const createServicoRoute = CreateServicoRoute.create(createServicoUseCase, [authMiddleware, RoleMiddleware.onlyAdmin()]);
     const listServicoRoute = ListServicosRoute.create(listServicosUseCase, [authMiddleware, RoleMiddleware.onlyAdmin()]);
     const deleteServicoRoute = DeleteServicoRoute.create(deleteServicoUseCase, [authMiddleware, RoleMiddleware.onlyAdmin()]);


     //CRUD de rotas para agendamentos
     const createAgendamentoRoute = CreateAgendamentoRoute.create(createAgendamentoUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()])
     const findByIntervalAgendamentoRoute = FindByIntervalAgendamentoRoute.create(findByIntervalAgendamentoUsecase, [authMiddleware, RoleMiddleware.adminOrCliente()])
     const findByIdAgendamentosRoute = FindByIdAgendamentoRoute.create(findAgendamentoUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()])
     const listAgendamentoRoute = ListAgendamentoRoute.create(listAgendamentoUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()])


     // CRUD de rotas de Clientes 
     const createClienteRoute = CreateClienteRoute.create(createClienteUsecase, [ValidationMiddleware.for(CreateClienteDto)])
     const loginClienteRoute = LoginClienteRoute.create(loginClienteUsecase)
     const findByEmailClienteRoute = FindByEmailClienteRoute.create(findByEmailClienteUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()])
     const findByIdClienteRoute = FindByIdClienteRoute.create(findByIdClientesUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()])
     const listClienteRoute = ListClienteRoute.create(listClientesUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()])
     const deleteClienteRoute = DeleteClienteRoute.create(deleteClientesUsecase, [authMiddleware, RoleMiddleware.onlyAdmin()] )


     const PORT = 3000;

     const api = ApiExpress.create([
          //rotas de serviço
          createServicoRoute, updateServicoRoute, findByIdServicoRoute, deleteServicoRoute, listServicoRoute,
          //rotas de agendamentos
          createAgendamentoRoute,findByIntervalAgendamentoRoute, findByIdAgendamentosRoute,  listAgendamentoRoute,
          //rotas de cliente
          createClienteRoute, loginClienteRoute, findByEmailClienteRoute, findByIdClienteRoute, listClienteRoute, deleteClienteRoute,
      ]);
     api.start(PORT)
}
main()