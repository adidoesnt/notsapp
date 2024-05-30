import { type Express } from 'express';
import { createServer, type Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { messageService } from './services';

export type CustomHttpServer = HttpServer & {
    init: (port: string | number) => void;
};

export type CustomServer = Server & {
    init: () => void;
};

export const getHttpServer = (app: Express) => {
    const httpServer = createServer(app) as CustomHttpServer;
    httpServer.init = (port: string | number) => {
        httpServer.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    };
    return httpServer;
};

export const getServer = (httpServer: HttpServer) => {
    const server = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    }) as CustomServer;

    server.init = () => {
        server.on('connection', (socket) => {
            const { id } = socket;
            console.log(`Client connected: ${id}`);

            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
                console.log(`Client ${id} joined room ${roomId}`);
            });

            socket.on('leaveRoom', (roomId) => {
                socket.leave(roomId);
                console.log(`Client ${id} left room ${roomId}`);
            });

            socket.on('send-message', async (message) => {
                console.log(`Client ${id} sent message`, { message });
                try {
                    const savedMessage =
                        await messageService.createMessage(message);
                    if (!savedMessage) throw new Error('Saved message is null');
                    const { UID } = savedMessage;
                    console.log(`Message created: ${UID}`);
                    server.to(message.roomId).emit('receive-message', message);
                } catch (error) {
                    console.error('Failed to create message', error);
                }
            });

            socket.on('disconnect', () => {
                console.log(`Client disconnected: ${id}`);
            });
        });
    };

    return server;
};
