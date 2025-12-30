import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/Role.middleware";

export function createClienteRoutes(
    createUsecase: any,
    loginUsecase: any,
    listUsecase: any,
    findByIdUsecase: any,
    findByEmailUsecase: any,
    deleteUsecase: any
) {
    const router = Router();

    // POST /api/clientes - Cadastrar
    router.post("/", async (req, res) => {
        try {
            const { nome, email, numero, senha, role } = req.body;

            const result = await createUsecase.execute({
                nome,
                email,
                numero,
                senha,
                role
            });

            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });

    // POST /api/clientes/auth - Login
    router.post("/auth", async (req, res) => {
        try {
            const { email, senha } = req.body;

            const result = await loginUsecase.execute({ email, senha });

            res.json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    });

    // GET /api/clientes - Listar todos
    router.get("/", authMiddleware, adminOnly, async (req, res) => {
        try {
            const result = await listUsecase.execute();
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    });

    // GET /api/clientes/:id - Buscar por ID
    router.get("/:id", authMiddleware, adminOnly, async (req, res) => {
        try {
            const { id } = req.params;
            const result = await findByIdUsecase.execute({ id });
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    });

    // GET /api/clientes/email/:email - Buscar por email
    router.get("/email/:email", authMiddleware, adminOnly, async (req, res) => {
        try {
            const { email } = req.params;
            const result = await findByEmailUsecase.execute({ email });
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    });

    // DELETE /api/clientes/:id - Deletar
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
