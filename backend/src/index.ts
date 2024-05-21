import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { routes } from 'api/router';
import { getHttpServer, getServer } from 'api/server';
import { database } from 'api/components/sequelize';

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes());

const httpServer = getHttpServer(app);
const server = getServer(httpServer);

await database.init();
server.init();
httpServer.init(PORT);
