import type { User } from '@prisma/client';
import type { ControllerProps } from 'api/controllers';
import { ERR } from 'constants/response';
import type { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { sessionService } from 'api/services';

const { JWT_SECRET = '' } = process.env;

export type AuthenticatedRequest = Request & {
    user: User;
};

const getTokenFromRequest = (request: ControllerProps['request']) => {
    const { authorization } = request.headers;
    if (!authorization) return null;
    const token = authorization.split(' ')[1];
    return token ?? null;
};

export const isTokenOld = async (token: string) => {
    const foundToken = await sessionService.getSessionByToken(token);
    return foundToken?.isRevoked;
};

const verifyToken = async (token: string) => {
    const isOld = await isTokenOld(token);
    if(isOld) throw new Error('Token is old');
    const user = verify(token, JWT_SECRET);
    return user;
};

export const authenticate = async ({
    request,
    response,
    next
}: ControllerProps) => {
    const token = getTokenFromRequest(request);
    if (!token) {
        const { status, message, hint } = ERR.UNAUTHORIZED;
        return response.status(status).json({ message, hint });
    }
    try {
        const user = await verifyToken(token);
        if (!user) {
            const { status, message, hint } = ERR.FORBIDDEN;
            return response.status(status).json({ message, hint });
        }
        (request as AuthenticatedRequest).user = user as User;
        next();
    } catch (error) {
        const { status, message, hint } = ERR.FORBIDDEN;
        return response.status(status).json({ message, hint });
    }
};
