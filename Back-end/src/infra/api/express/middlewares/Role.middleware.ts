import { ClienteRole } from "domain/cliente/entity/cliente";
import { Request, Response, NextFunction } from "express";

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ message: "Não autenticado" });
        return;
    }

    if (req.user.role !== ClienteRole.ADMIN) {
        res.status(403).json({ message: "Acesso negado" });
        return;
    }

    next();
};

export const clienteOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ message: "Não autenticado" });
        return;
    }

    if (req.user.role !== ClienteRole.ADMIN && req.user.role !== ClienteRole.CLIENTE) {
        res.status(403).json({ message: "Acesso negado" });
        return;
    }

    next();
};