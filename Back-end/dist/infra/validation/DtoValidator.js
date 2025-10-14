"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoValidator = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const ValidationException_1 = require("./ValidationException");
class DtoValidator {
    static async validate(dtoClass, data) {
        const dto = (0, class_transformer_1.plainToClass)(dtoClass, data);
        const errors = await (0, class_validator_1.validate)(dto, {
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: true
        });
        if (errors.length > 0) {
            const errorMessages = this.formatErrors(errors);
            throw new ValidationException_1.ValidationException(errorMessages);
        }
        return dto;
    }
    static formatErrors(errors) {
        const messages = [];
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
exports.DtoValidator = DtoValidator;
