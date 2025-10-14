import { NextFunction, Request, Response} from "express";
import { IMiddleware } from "./IMiddleware";
import { DtoValidator } from "../../../../infra/validation/DtoValidator";
import { ValidationException } from "../../../../infra/validation/ValidationException";

export class ValidationMiddleware implements IMiddleware {
    constructor(private readonly dtoClass: new () => any) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = await DtoValidator.validate(this.dtoClass, request.body)
            
            request.body = validatedData
            
            next()
        } catch (error) {
            if (error instanceof ValidationException) {
                response.status(400).json({
                    message: 'Validação falhou',
                    errors: error.errors
                });
                return
            }
            
            response.status(500).json({
                message: 'Erro ao validar dados'
            })
        }
    }

    static for<T extends object>(dtoClass: new () => T): ValidationMiddleware {
        return new ValidationMiddleware(dtoClass)
    }
}