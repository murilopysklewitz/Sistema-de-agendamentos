import { prisma } from "./infra/database/prisma/prisma";

// Repositories
import { ServicoRepositoryPrisma } from "./infra/repositories/servico/servico.repository.prisma";
import { ClienteRepository } from "./infra/repositories/cliente/cliente.repository.prisma";
import { AgendamentoRepository } from "./infra/repositories/agendamento/agendamento.repository,prisma";

// Services
import { BcryptPasswordHasher } from "./infra/security/BcryptPasswordHasher";
import { JWTService } from "./infra/security/JWTService";
import { AgendamentoMapperPrisma } from "./infra/database/prisma/mappers/agendamento.mapper";
import { AgendamentoValidatorService } from "./domain/agendamento/service/agendamento-validator.service";

// Usecases - Serviço
import { CreateServicoUseCase } from "./usecases/servico.usecases/create-servico/createServico.usecase";
import { ListServicoUsecase } from "./usecases/servico.usecases/list-servico/listServico.usecase";
import { FindByIdServicoUsecase } from "./usecases/servico.usecases/findById-servico/findByIdServico.usecase";
import { UpdateServicoUsecase } from "./usecases/servico.usecases/update-servico/updateServico.usecase";
import { DeleteServicoUsecase } from "./usecases/servico.usecases/delete-servico/deleteServico.usecase";

// Usecases - Cliente
import { CreateClienteUsecase } from "./usecases/cliente.usecases/createCliente.usecase";
import { LoginClienteUsecase } from "./usecases/cliente.usecases/loginCliente.usecase";
import { ListClienteUsecase } from "./usecases/cliente.usecases/listCliente.usecase";
import { FindByIdClienteUsecase } from "./usecases/cliente.usecases/findById.usecase";
import { FindByEmailClienteUsecase } from "./usecases/cliente.usecases/findByEmail.usecase";
import { DeleteClienteUsecase } from "./usecases/cliente.usecases/deleteCliente.usecase";

// Usecases - Agendamento
import { CreateAgendamentoUsecase } from "./usecases/agendamento.usecases/createAgendamento.usecase";
import { ListAgendamentoUsecase } from "./usecases/agendamento.usecases/listAgendamento.usecase";
import { FindByIdAgendamentoUsecase } from "./usecases/agendamento.usecases/findByIdAgendamentos.usecase";
import { FindByIntervalAgendamentoUsecase } from "./usecases/agendamento.usecases/findByIntervalAgendamento.Usecase";
import { createServicoRoutes } from "infra/api/express/routes/ServicoRoutes";
import { createClienteRoutes } from "infra/api/express/routes/ClienteRoutes";
import { createAgendamentoRoutes } from "infra/api/express/routes/AgendamentoRoutes";
import { ApiExpress } from "infra/api/express/apiExpress";

// Routes

function main() {
    // Inicializa repositórios
    const servicoRepository = ServicoRepositoryPrisma.create(prisma);
    const clienteRepository = ClienteRepository.create(prisma);
    const agendamentoMapper = new AgendamentoMapperPrisma();
    const agendamentoRepository = AgendamentoRepository.create(prisma, agendamentoMapper);

    // Inicializa serviços
    const passwordHasher = new BcryptPasswordHasher(10);
    const jwtService = new JWTService();
    const agendamentoValidator = AgendamentoValidatorService.create(agendamentoRepository);

    // Cria usecases - Serviço
    const createServicoUsecase = CreateServicoUseCase.create(servicoRepository);
    const listServicoUsecase = ListServicoUsecase.create(servicoRepository);
    const findByIdServicoUsecase = FindByIdServicoUsecase.create(servicoRepository);
    const updateServicoUsecase = UpdateServicoUsecase.create(servicoRepository);
    const deleteServicoUsecase = DeleteServicoUsecase.create(servicoRepository);

    // Cria usecases - Cliente
    const createClienteUsecase = CreateClienteUsecase.create(clienteRepository, passwordHasher);
    const loginClienteUsecase = LoginClienteUsecase.create(clienteRepository, passwordHasher, jwtService);
    const listClienteUsecase = ListClienteUsecase.create(clienteRepository);
    const findByIdClienteUsecase = FindByIdClienteUsecase.create(clienteRepository);
    const findByEmailClienteUsecase = FindByEmailClienteUsecase.create(clienteRepository);
    const deleteClienteUsecase = DeleteClienteUsecase.create(clienteRepository);

    // Cria usecases - Agendamento
    const createAgendamentoUsecase = CreateAgendamentoUsecase.create(
        agendamentoRepository,
        agendamentoValidator,
        servicoRepository,
        clienteRepository
    );
    const listAgendamentoUsecase = ListAgendamentoUsecase.create(agendamentoRepository);
    const findByIdAgendamentoUsecase = FindByIdAgendamentoUsecase.create(agendamentoRepository);
    const findByIntervalAgendamentoUsecase = FindByIntervalAgendamentoUsecase.create(agendamentoRepository);

    // Cria rotas
    const servicoRoutes = createServicoRoutes(
        createServicoUsecase,
        listServicoUsecase,
        findByIdServicoUsecase,
        updateServicoUsecase,
        deleteServicoUsecase
    );

    const clienteRoutes = createClienteRoutes(
        createClienteUsecase,
        loginClienteUsecase,
        listClienteUsecase,
        findByIdClienteUsecase,
        findByEmailClienteUsecase,
        deleteClienteUsecase
    );

    const agendamentoRoutes = createAgendamentoRoutes(
        createAgendamentoUsecase,
        listAgendamentoUsecase,
        findByIdAgendamentoUsecase,
        findByIntervalAgendamentoUsecase
    );

    // Configura API
    const api = new ApiExpress();
    api.addRoutes("/api/servicos", servicoRoutes);
    api.addRoutes("/api/clientes", clienteRoutes);
    api.addRoutes("/api/agendamentos", agendamentoRoutes);
    api.setupSwagger();

    // Inicia servidor
    const PORT = 3000;
    api.start(PORT);
}

main();