import type { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidv4 } from 'uuid';

export type CreateChatWithUsersAttributes = Prisma.ChatUserCreateManyInput[];

export const createManyChatUsers = async (
    data: CreateChatWithUsersAttributes
) => {
    try {
        const chat = await prisma.chatUser.createManyAndReturn({
            data
        });
        return chat;
    } catch (error) {
        console.error('Failed to create chat with users', error);
    }
};
