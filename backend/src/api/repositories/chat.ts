import { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidv4 } from 'uuid';

export type CreateChatAttributes = Omit<Prisma.ChatCreateInput, 'UID'> & {
    chatUsers: Prisma.ChatUserCreateNestedManyWithoutChatInput;
};

export type FindChatByUUIDsAttributes = {
    userUUIDs: string[];
};

export type FindManyChatsByUUIDAttributes = {
    userUUID: string;
};

export const createChat = async () => {
    const uid = uuidv4();
    try {
        const chat = await prisma.chat.create({
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
                chatUsers: {
                    include: {
                        user: {
                            select: {
                                UUID: true,
                                username: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });
        return chat;
    } catch (error) {
        console.error('Failed to get chat by UUIDs', error);
    }
};

export const getManyChatsByUUID = async (data: FindManyChatsByUUIDAttributes) => {
    try {
        const { userUUID } = data;
        const chats = await prisma.chat.findMany({
            where: {
                chatUsers: {
                    some: {
                        userUUID
                    }
                }
            },
            include: {
                chatUsers: {
                    include: {
                        user: {
                            select: {
                                UUID: true,
                                username: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });
        return chats;
    } catch (error) {
        console.error('Failed to get many chats by UUID', error);
    }
};
