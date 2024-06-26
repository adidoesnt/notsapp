import {
    Router,
    type NextFunction,
    type Request,
    type Response
} from 'express';
import { MSG } from 'constants/response';
import {
    chatController,
    messageController,
    userController
} from 'api/controllers';
import { authenticate } from 'api/middleware';

export const routes = () => {
    const router = Router();

    router.get(/\/(health)?$/, (_: Request, response: Response) => {
        const { status, message } = MSG.OK;
        return response.status(status).send({ message });
    });

    router.post(
        '/signup',
        async (request: Request, response: Response, next: NextFunction) => {
            return await userController.signup({ request, response, next });
        }
    );

    router.post(
        '/login',
        async (request: Request, response: Response, next: NextFunction) => {
            return await userController.login({ request, response, next });
        }
    );

    router.use(
        async (request: Request, response: Response, next: NextFunction) =>
            await authenticate({ request, response, next })
    );

    router.post(
        '/chat',
        async (request: Request, response: Response, next: NextFunction) => {
            return await chatController.createChatWithUsers({
                request,
                response,
                next
            });
        }
    );

    router.get(
        '/chats/:userUUID',
        async (request: Request, response: Response, next: NextFunction) => {
            return await chatController.getAllChatsByUUID({
                request,
                response,
                next
            });
        }
    );

    router.get(
        '/users',
        async (request: Request, response: Response, next: NextFunction) => {
            return await userController.getAllUsers({
                request,
                response,
                next
            });
        }
    );

    router.get(
        '/messages/:chatUID',
        async (request: Request, response: Response, next: NextFunction) => {
            return await messageController.getMessagesByChatUID({
                request,
                response,
                next
            });
        }
    );

    return router;
};
