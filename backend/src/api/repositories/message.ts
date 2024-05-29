import type { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidv4 } from 'uuid';

export type CreateMessageAttributes = Omit<
    Omit<Prisma.MessageCreateInput, 'UID'>,
    'timestamp'
>;

export type FindMessageAttributes = {
    UID: string;
};

export const createMessage = async (data: CreateMessageAttributes) => {
    try {
        const UID = uuidv4();
        const timestamp = new Date();
        await prisma.message.create({
            data: {
                ...data,
                UID,
                timestamp
            }
        });
        const message = await getMessageByUID({ UID });
        return message;
    } catch (error) {
        console.error('Failed to create message attributes', error);
        return null;
    }
};

export const getMessageByUID = async (data: FindMessageAttributes) => {
    try {
        const { UID } = data;
        const message = await prisma.message.findFirst({
            where: {
                UID
            },
            include: {
                sender: {
                    select: {
                        UUID: true,
                        username: true,
                        firstName: true,
                        lastName: true
                    }
                },
                chat: {
                    select: {
                        UID: true
                    }
                }
            }
        });
        return message;
    } catch (error) {
        console.error('Failed to find message by UID', error);
        return null;
    }
};