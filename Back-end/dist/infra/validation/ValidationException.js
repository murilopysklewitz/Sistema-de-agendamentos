"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    errors;
    constructor(errors, message = 'Dados inválidos') {
        super(message);
        this.errors = errors;
        this.name = 'ValidationException';
    }
}
exports.ValidationException = ValidationException;
