import { ApiExpress } from "./infra/api/express/routes/api.express";
import { CreateServicoRoute } from "./infra/api/express/routes/servico/create-servico.express.route";
import { DeleteServicoRoute } from "./infra/api/express/routes/servico/delete-servico.express.route";
import { FindByIdServicoRoute } from "./infra/api/express/routes/servico/findById-servico.express.route";
import { ListServicosRoute } from "./infra/api/express/routes/servico/list-product.express.route";
import { ServicoRepositoryPrisma } from "./infra/repositories/servico/servico.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateServicoUseCase } from "./usecases/create-servico/createServico.usecase";
import { DeleteServicoUsecase } from "./usecases/delete-servico/deleteServico.usecase";
import { FindByIdServicoUsecase } from "./usecases/findById/findByIdServico.usecase";
import { ListServicoUsecase } from "./usecases/list-servico/listServico.usecase";

function main() {
     const aRepository = ServicoRepositoryPrisma.create(prisma);

     const createServicoUseCase = CreateServicoUseCase.create(aRepository);
     const listServicosUseCase = ListServicoUsecase.create(aRepository);
     const findByIdServicoUsecase = FindByIdServicoUsecase.create(aRepository)
     const deleteServicoUseCase = DeleteServicoUsecase.create(aRepository);

     const createRoute = CreateServicoRoute.create(createServicoUseCase);
     const listRoute = ListServicosRoute.create(listServicosUseCase);
     const deleteRoute = DeleteServicoRoute.create(deleteServicoUseCase);
     const findByIdRoute = FindByIdServicoRoute.create(findByIdServicoUsecase);

     const port = 8080;

     const api = ApiExpress.create([createRoute, listRoute, deleteRoute, findByIdRoute]);
     api.start(port)
}
main()