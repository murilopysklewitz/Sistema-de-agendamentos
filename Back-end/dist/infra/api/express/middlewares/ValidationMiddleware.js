"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const DtoValidator_1 = require("../../../../infra/validation/DtoValidator");
const ValidationException_1 = require("../../../../infra/validation/ValidationException");
class ValidationMiddleware {
    dtoClass;
    constructor(dtoClass) {
        this.dtoClass = dtoClass;
    }
    async handle(request, response, next) {
        try {
            const validatedData = await DtoValidator_1.DtoValidator.validate(this.dtoClass, request.body);
            request.body = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof ValidationException_1.ValidationException) {
                response.status(400).json({
                    message: 'Validação falhou',
                    errors: error.errors
                });
                return;
            }
            response.status(500).json({
                message: 'Erro ao validar dados'
            });
        }
    }
    static for(dtoClass) {
        return new ValidationMiddleware(dtoClass);
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
