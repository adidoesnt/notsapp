import type { Prisma, Session } from '@prisma/client';
import { prisma } from 'index';

export type CreateSessionAttributes = Prisma.SessionCreateInput;
export type GetSessionAttributes = Prisma.SessionFindFirstOrThrowArgs;

export const createSession = async (data: CreateSessionAttributes) => {
    try {
        const createdSession = await prisma.session.create({
            data
        });
        return createdSession;
    } catch (error) {
        console.error('Failed to create session', error);
    }
};

export const getSessionByToken = async (token: string, throws?: boolean) => {
    try {
        const where: GetSessionAttributes['where'] = {
            token
        };
        let foundSession: Session | null;
        if (throws) {
            foundSession = await prisma.session.findFirstOrThrow({
                where
            });
        } else {
            foundSession = await prisma.session.findFirst({
                where
            });
        }
        return foundSession;
    } catch (error) {
        console.error('Failed to find session by token', error);
        return null;
    }
};
