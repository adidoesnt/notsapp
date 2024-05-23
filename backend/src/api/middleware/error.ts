import { ERR } from 'constants/response';
import type { Request, Response } from 'express';

export const handleError = (err: Error, _: Request, response: Response) => {
    const { status, message } = ERR.INTERNAL;
    console.error(err);
    response.status(status).send({ message });
};
