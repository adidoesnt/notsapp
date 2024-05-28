import type { Prisma } from '@prisma/client';
import { prisma } from 'index';

export type CreateChatUsersAttributes = Prisma.ChatUserCreateManyInput[];

export const createChatUsers = async (data: CreateChatUsersAttributes) => {
    try {
        const chatUsersCreated = await prisma.chatUser.createManyAndReturn({
            data
        });
        return chatUsersCreated;
    } catch (error) {
        console.error('Failed to create chat users', error);
    }
};
