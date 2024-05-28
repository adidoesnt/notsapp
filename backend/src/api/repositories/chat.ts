import { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidv4 } from 'uuid';

export type CreateChatAttributes = Omit<Prisma.ChatCreateInput, 'UID'> & {
    chatUsers: Prisma.ChatUserCreateNestedManyWithoutChatInput;
};

export type FindChatByUUIDsAttributes = {
    userUUIDs: string[];
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

export const getChatByUUIDs = async (data: FindChatByUUIDsAttributes) => {
    try {
        const { userUUIDs } = data;
        const chat = await prisma.chat.findFirst({
            where: {
                chatUsers: {
                    every: {
                        userUUID: {
                            in: userUUIDs
                        }
                    }
                }
            },
            include: {
                chatUsers: true
            }
        });
        return chat;
    } catch (error) {
        console.error('Failed to get chat by UUIDs', error);
    }
};
