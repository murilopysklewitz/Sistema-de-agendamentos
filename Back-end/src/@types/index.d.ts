import { ClienteRole } from 'domain/cliente/entity/cliente';
import 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            clienteId: string;
            email: string;
            role: ClienteRole
        };
    }
}
