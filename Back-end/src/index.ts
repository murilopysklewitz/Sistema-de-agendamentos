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
import { CreateAgendamentoUsecase } from './usecases/agendamento.usecases/create-agendamento/createAgendamento.usecase';
import { AgendamentoRepository } from './infra/repositories/agendamento/agendamento.repository,prisma';
import { AgendamentoMapperPrisma } from './infra/database/prisma/mappers/agendamento.mapper';
import { AgendamentoValidatorService } from './domain/agendamento/service/agendamento-validator.service';
import { CreateAgendamentoRoute } from './infra/api/express/routes/agendamentos/create-agendamento.express.route';
import { ClienteRepository } from './infra/repositories/cliente/cliente.repository.prisma';
import { CreateClienteUsecase } from 'usecases/cliente.usecases/createCliente.usecase';
import { CreateClienteRoute } from 'infra/api/express/routes/clientes/create-cliente.express.route';



function main() {
     const mapper = new AgendamentoMapperPrisma()
     const aRepository = ServicoRepositoryPrisma.create(prisma);
     const aRepositoryClientes = ClienteRepository.create(prisma)
     const aRepositoryAgendamentos = AgendamentoRepository.create(prisma, mapper)
     
     const vallidator = AgendamentoValidatorService.create(aRepositoryAgendamentos)

     
     // CRUD de usecase para serviços
     const findByIdServicoUsecase = FindByIdServicoUsecase.create(aRepository)
     const updateServicoUsecase = UpdateServicoUsecase.create(aRepository)
     const createServicoUseCase = CreateServicoUseCase.create(aRepository);
     const listServicosUseCase = ListServicoUsecase.create(aRepository);
     const deleteServicoUseCase = DeleteServicoUsecase.create(aRepository);

     // CRUD de usecases para clientes
     const createClienteUsecase = CreateClienteUsecase.create(aRepositoryClientes)

     //CRUD de usecase para agendamentos
     const createAgendamentoUsecase = CreateAgendamentoUsecase.create(aRepositoryAgendamentos, vallidator, aRepository, aRepositoryClientes)

     // CRUD de rotas para serviços
     const findByIdServicoRoute = FindByIdServicoRoute.create(findByIdServicoUsecase);
     const updateServicoRoute = UpdateServicoRoute.create(updateServicoUsecase)
     const createServicoRoute = CreateServicoRoute.create(createServicoUseCase);
     const listServicoRoute = ListServicosRoute.create(listServicosUseCase);
     const deleteServicoRoute = DeleteServicoRoute.create(deleteServicoUseCase);


     //CRUD de rotas para agendamentos
     const createAgendamentoRoute = CreateAgendamentoRoute.create(createAgendamentoUsecase)

     // CRUD de rotas de Clientes 
     const createClienteRoute = CreateClienteRoute.create(createClienteUsecase)


     const PORT = 3000;

     const api = ApiExpress.create([
          //rotas de serviço
          createServicoRoute, updateServicoRoute, findByIdServicoRoute, deleteServicoRoute, listServicoRoute,
          //rotas de agendamentos
          createAgendamentoRoute,
          //rotas de cliente
          createClienteRoute
      ]);
     api.start(PORT)
}
main()