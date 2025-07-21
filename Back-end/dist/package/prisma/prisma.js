"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = getPrismaClient;
const client_1 = require("@prisma/client");
function getPrismaClient() {
    return new client_1.PrismaClient();
}
