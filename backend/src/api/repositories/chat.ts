import { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidv4 } from 'uuid';

export type CreateChatAttributes = Omit<Prisma.ChatCreateInput, 'UID'> & {
    chatUsers: Prisma.ChatUserCreateNestedManyWithoutChatInput;
};

export const createChat = () => {
    const uid = uuidv4();
    try {
        const chat = prisma.chat.create({
            data: {
                UID: uid
            }
        });
        return chat;
    } catch (error) {
        console.error('Failed to create chat attributes', error);
    }
};
