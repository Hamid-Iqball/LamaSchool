import { PrismaClient } from '@prisma/client';

// Define a singleton function to create or return the PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare the globalThis object to hold the PrismaClient instance
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Get the PrismaClient instance from globalThis or create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// In development, store the PrismaClient instance on globalThis for hot-reloading
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;