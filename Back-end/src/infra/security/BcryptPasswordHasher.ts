import { IPasswordHasher } from "../../domain/cliente/services/IPasswordHasher";
import bcrypt from 'bcrypt'

export class BcryptPasswordHasher implements IPasswordHasher {
    private readonly saltRounds: number;

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds
    }

    public async hash(senha: string): Promise<string> {
        const senhaHash = await bcrypt.hash(senha, this.saltRounds) 
        return senhaHash
    }

    public compare(senha: string, senhaHash: string): Promise<boolean> {
        const senhaCompared = bcrypt.compare(senha, senhaHash)
        return senhaCompared
    }
}