import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                clienteId: string;
                email: string;
            };
        }
    }
}