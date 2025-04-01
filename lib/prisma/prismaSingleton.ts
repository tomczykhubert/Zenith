import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const client = new PrismaClient();

  return client;
};

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = createPrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
