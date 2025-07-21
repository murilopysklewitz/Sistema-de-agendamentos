"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_express_1 = require("./infra/api/express/routes/api.express");
const create_servico_express_route_1 = require("./infra/api/express/routes/servico/create-servico.express.route");
const delete_servico_express_route_1 = require("./infra/api/express/routes/servico/delete-servico.express.route");
const findById_servico_express_route_1 = require("./infra/api/express/routes/servico/findById-servico.express.route");
const list_product_express_route_1 = require("./infra/api/express/routes/servico/list-product.express.route");
const servico_repository_prisma_1 = require("./infra/repositories/servico/servico.repository.prisma");
const prisma_1 = require("./package/prisma/prisma");
const createServico_usecase_1 = require("./usecases/create-servico/createServico.usecase");
const deleteServico_usecase_1 = require("./usecases/delete-servico/deleteServico.usecase");
const findByIdServico_usecase_1 = require("./usecases/findById/findByIdServico.usecase");
const listServico_usecase_1 = require("./usecases/list-servico/listServico.usecase");
function main() {
    const prisma = (0, prisma_1.getPrismaClient)();
    const aRepository = servico_repository_prisma_1.ServicoRepositoryPrisma.create(prisma);
    const findByIdServicoUsecase = findByIdServico_usecase_1.FindByIdServicoUsecase.create(aRepository);
    const createServicoUseCase = createServico_usecase_1.CreateServicoUseCase.create(aRepository);
    const listServicosUseCase = listServico_usecase_1.ListServicoUsecase.create(aRepository);
    const deleteServicoUseCase = deleteServico_usecase_1.DeleteServicoUsecase.create(aRepository);
    const findByIdRoute = findById_servico_express_route_1.FindByIdServicoRoute.create(findByIdServicoUsecase);
    const createRoute = create_servico_express_route_1.CreateServicoRoute.create(createServicoUseCase);
    const listRoute = list_product_express_route_1.ListServicosRoute.create(listServicosUseCase);
    const deleteRoute = delete_servico_express_route_1.DeleteServicoRoute.create(deleteServicoUseCase);
    const port = 8080;
    const api = api_express_1.ApiExpress.create([createRoute, findByIdRoute, listRoute, deleteRoute]);
    api.start(port);
}
main();
