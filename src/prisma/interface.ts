import {PrismaClient} from "@prisma/client";

export type IPrismaClientTransaction = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">;
