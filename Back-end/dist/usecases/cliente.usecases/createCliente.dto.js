"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClienteDto = void 0;
const class_validator_1 = require("class-validator");
const cliente_1 = require("../../domain/cliente/entity/cliente");
class CreateClienteDto {
    nome;
    email;
    numero;
    senha;
    role;
}
exports.CreateClienteDto = CreateClienteDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nome deve ser uma string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Nome deve ter no máximo 255 caracteres' }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Número deve ser uma string' }),
    (0, class_validator_1.Matches)(/^[0-9\s\-\(\)]+$/, { message: 'Número de telefone inválido' }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "numero", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Senha deve ser uma string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { message: 'Senha deve conter: maiúscula, minúscula, número e caractere especial' }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(cliente_1.ClienteRole, { message: 'Role deve ser ADMIN ou CLIENTE' }),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "role", void 0);
