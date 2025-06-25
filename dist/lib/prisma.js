"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRISMA = void 0;
const client_1 = require("@prisma/client");
// Prevent multiple instances during development
const globalForPrisma = globalThis;
exports.PRISMA = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new client_1.PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
// Handle graceful shutdown
process.on('beforeExit', () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.PRISMA.$disconnect();
}));
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.PRISMA.$disconnect();
    process.exit(0);
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.PRISMA.$disconnect();
    process.exit(0);
}));
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.PRISMA;
}
