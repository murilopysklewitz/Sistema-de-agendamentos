import { ApiExpress } from "./infra/api/express/routes/api.express";
import { CreateServicoRoute } from "./infra/api/express/routes/servico/create-servico.express.route";
import { ListServicosRoute } from "./infra/api/express/routes/servico/list-product.express.route";
import { ServicoRepositoryPrisma } from "./infra/repositories/servico/servico.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateServicoUseCase } from "./usecases/create-servico/createServico.usecase";
import { ListServicoUsecase } from "./usecases/list-servico/listServico.usecase";

function main() {
     const aRepository = ServicoRepositoryPrisma.create(prisma);

     const createServicoUseCase = CreateServicoUseCase.create(aRepository);
     const listServicosUseCase = ListServicoUsecase.create(aRepository);

     const createRoute = CreateServicoRoute.create(createServicoUseCase);
     const listRoute = ListServicosRoute.create(listServicosUseCase);

     const port = 8080;

     const api = ApiExpress.create([createRoute, listRoute]);
     api.start(port)
}
main()