export class ValidationException extends Error {
    constructor(
        public readonly errors: string[],
        message: string = 'Dados inválidos'
    ) {
        super(message);
        this.name = 'ValidationException';
    }
}