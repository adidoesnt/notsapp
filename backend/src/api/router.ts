import { Router, type Request, type Response } from 'express';
import { MSG } from 'constants/response';

export const routes = () => {
    const router = Router();

    router.get(/\/(health)?$/, (_: Request, response: Response) => {
        const { status, message } = MSG.OK;
        return response.status(status).send({ message });
    });

    return router;
};
