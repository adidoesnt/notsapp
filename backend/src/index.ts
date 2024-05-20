import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { routes } from 'api/router';
import { getHttpServer, getServer } from 'api/server';

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes());

const httpServer = getHttpServer(app);
const server = getServer(httpServer);

server.init();
httpServer.init(PORT);
