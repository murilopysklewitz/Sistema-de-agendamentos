import { JWTService } from "../../../../infra/security/JWTService";
import { Request, Response, NextFunction } from "express";

const jwtService = new JWTService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Token ausente" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const payload = jwtService.verifyAccessToken(token);

        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
};