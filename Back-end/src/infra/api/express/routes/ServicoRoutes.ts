import { Router } from "express";
import { CreateServicoUseCase } from "../../../../usecases/servico.usecases/create-servico/createServico.usecase";
import { DeleteServicoUsecase } from "../../../../usecases/servico.usecases/delete-servico/deleteServico.usecase";
import { FindByIdServicoUsecase } from "../../../../usecases/servico.usecases/findById-servico/findByIdServico.usecase";
import { ListServicoUsecase } from "../../../../usecases/servico.usecases/list-servico/listServico.usecase";
import { UpdateServicoUsecase } from "../../../../usecases/servico.usecases/update-servico/updateServico.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/Role.middleware";

export function createServicoRoutes(
    createUsecase: CreateServicoUseCase,
    listUsecase: ListServicoUsecase,
    findByIdUsecase: FindByIdServicoUsecase,
    updateUsecase: UpdateServicoUsecase,
    deleteUsecase: DeleteServicoUsecase
) {
    const router = Router();

    // POST /api/servicos - Criar serviço
    router.post("/", authMiddleware, adminOnly, async (req, res) => {
        try {
            const { nome, preco, descricao, destaque, duracaoEmMinutos } = req.body;

            const result = await createUsecase.execute({
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos
            });

            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });

    // GET /api/servicos - Listar todos
    router.get("/", async (req, res) => {
        try {
            const result = await listUsecase.execute();
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    });

    // GET /api/servicos/:id - Buscar por ID
    router.get("/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const result = await findByIdUsecase.execute({ id });
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    });

    // PUT /api/servicos/:id - Atualizar
    router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, preco, descricao, destaque, duracaoEmMinutos } = req.body;

            await updateUsecase.execute({
                id,
                nome,
                preco,
                descricao,
                destaque,
                duracaoEmMinutos
            });

            res.json({ message: "Serviço atualizado com sucesso" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });

    // DELETE /api/servicos/:id - Deletar
    router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
        try {
            const { id } = req.params;
            await deleteUsecase.execute({ id });
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });

    return router;
}