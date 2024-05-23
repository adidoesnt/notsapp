import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { routes } from 'api/router';
import { getHttpServer, getServer } from 'api/server';
import { PrismaClient } from '@prisma/client';
import { handleError } from 'api/middleware';

const { PORT = 3001 } = process.env;

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes());
app.use(handleError);

const httpServer = getHttpServer(app);
const server = getServer(httpServer);

try {
    server.init();
    httpServer.init(PORT);
} catch (error) {
    console.error(error);
}

await prisma.$disconnect();
