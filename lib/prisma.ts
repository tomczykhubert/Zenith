import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const client = new PrismaClient().$extends({
    query: {
      $allModels: {
        async create({ args, query }) {
          if (args.data) {
            for (const key in args.data) {
              if (args.data[key] === "") {
                args.data[key] = null;
              }
            }
          }
          return query(args);
        },
        async update({ args, query }) {
          if (args.data) {
            for (const key in args.data) {
              if (args.data[key] === "") {
                args.data[key] = null;
              }
            }
          }
          return query(args);
        },
      },
    },
  });

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
