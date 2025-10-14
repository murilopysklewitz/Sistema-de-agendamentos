
import { IsString, MinLength, MaxLength, Matches, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ClienteRole } from '../../domain/cliente/entity/cliente';


export class CreateClienteDto {
    @IsString({ message: 'Nome deve ser uma string' })
    @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
    nome!: string;

    @IsEmail({}, { message: 'Email inválido' })
    email!: string;

    @IsOptional()
    @IsString({ message: 'Número deve ser uma string' })
    @Matches(/^[0-9\s\-\(\)]+$/, { message: 'Número de telefone inválido' })
    numero?: string;

    @IsString({ message: 'Senha deve ser uma string' })
    @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'Senha deve conter: maiúscula, minúscula, número e caractere especial' }
    )
    senha!: string;

    @IsOptional()
    @IsEnum(ClienteRole, { message: 'Role deve ser ADMIN ou CLIENTE' })
    role?: ClienteRole;
}