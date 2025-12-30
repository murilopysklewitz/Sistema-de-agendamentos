import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/Role.middleware";

export function createAgendamentoRoutes(
    createUsecase: any,
    listUsecase: any,
    findByIdUsecase: any,
    findByIntervalUsecase: any
) {
    const router = Router();

    // POST /api/agendamentos - Criar agendamento
    router.post("/", authMiddleware, async (req:Request, res: Response) => {
        try {
            const { clienteId, servicoId, data, horaInicio } = req.body;

            const result = await createUsecase.execute({
                clienteId,
                servicoId,
                data: new Date(data),
                horaInicio: new Date(horaInicio)
            });

            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    });

    // GET /api/agendamentos - Listar todos
    router.get("/", authMiddleware, adminOnly, async (req:Request, res: Response) => {
        try {
            const result = await listUsecase.execute();
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    });

    // GET /api/agendamentos/date?data=2025-01-15 - Buscar por data
    router.get("/date", authMiddleware, async (req:Request, res: Response) => {
        try {
            const { data } = req.query;

            if (!data) {
                res.status(400).json({ 
                    message: "Parâmetro 'data' é obrigatório (formato: YYYY-MM-DD)" 
                });
            }

            const dataDate = new Date(data as string);

            if (isNaN(dataDate.getTime())) {
                res.status(400).json({ 
                    message: "Data inválida. Use formato: YYYY-MM-DD" 
                });
            }

            const result = await findByIntervalUsecase.execute({ data: dataDate });
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    });

    // GET /api/agendamentos/:id - Buscar por ID
    router.get("/:id", authMiddleware, async (req, res) => {
        try {
            const { id } = req.params;
            const result = await findByIdUsecase.execute({ id });
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    });

    return router;
}