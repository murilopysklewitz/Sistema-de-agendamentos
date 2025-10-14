import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from './ValidationException';

export class DtoValidator {
    static async validate<T extends object>(dtoClass: new () => T, data: unknown): Promise<T> {

        const dto = plainToClass(dtoClass, data);

        const errors = await validate(dto as object, {
            skipMissingProperties: false,
            whitelist: true, 
            forbidNonWhitelisted: true 
        });

        if (errors.length > 0) {
            const errorMessages = this.formatErrors(errors);
            throw new ValidationException(errorMessages);
        }

        return dto;
    }

    private static formatErrors(errors: ValidationError[]): string[] {
        const messages: string[] = [];

        errors.forEach((error) => {
            if (error.constraints) {
                messages.push(...Object.values(error.constraints));
            }
            if (error.children && error.children.length > 0) {
                messages.push(...this.formatErrors(error.children));
            }
        });

        return messages;
    }
}