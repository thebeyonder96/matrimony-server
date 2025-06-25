import { PrismaClient } from '@prisma/client';

// Prevent multiple instances during development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const PRISMA = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Handle graceful shutdown
process.on('beforeExit', async () => {
  await PRISMA.$disconnect();
});

process.on('SIGINT', async () => {
  await PRISMA.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await PRISMA.$disconnect();
  process.exit(0);
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = PRISMA;
}