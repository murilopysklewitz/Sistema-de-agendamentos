"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordHasher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptPasswordHasher {
    saltRounds;
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }
    async hash(senha) {
        const senhaHash = await bcrypt_1.default.hash(senha, this.saltRounds);
        return senhaHash;
    }
    compare(senha, senhaHash) {
        const senhaCompared = bcrypt_1.default.compare(senha, senhaHash);
        return senhaCompared;
    }
}
exports.BcryptPasswordHasher = BcryptPasswordHasher;
