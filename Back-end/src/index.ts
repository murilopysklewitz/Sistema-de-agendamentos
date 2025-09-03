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



function main() {
     const aRepository = ServicoRepositoryPrisma.create(prisma);
     
     // CRUD de usecase para serviços
     const findByIdServicoUsecase = FindByIdServicoUsecase.create(aRepository)
     const updateServicoUsecase = UpdateServicoUsecase.create(aRepository)
     const createServicoUseCase = CreateServicoUseCase.create(aRepository);
     const listServicosUseCase = ListServicoUsecase.create(aRepository);
     const deleteServicoUseCase = DeleteServicoUsecase.create(aRepository);

     // CRUD de rotas para serviços
     const findByIdServicoRoute = FindByIdServicoRoute.create(findByIdServicoUsecase);
     const updateServicoRoute = UpdateServicoRoute.create(updateServicoUsecase)
     const createServicoRoute = CreateServicoRoute.create(createServicoUseCase);
     const listServicoRoute = ListServicosRoute.create(listServicosUseCase);
     const deleteServicoRoute = DeleteServicoRoute.create(deleteServicoUseCase);


     const PORT = 3000;

     const api = ApiExpress.create([
          createServicoRoute, updateServicoRoute, findByIdServicoRoute, deleteServicoRoute, listServicoRoute,
          
      ]);
     api.start(PORT)
}
main()