import type { User } from '@prisma/client';
import { chatRepository } from 'api/repositories';
import { chatUserService } from 'api/services';
import { prisma } from 'index';

export const createChatWithUsers = async (users: User[]) => {
    try {
        return await prisma.$transaction(async (prisma) => {
            const existingChat = await getChatByUUIDs(users);
            if (existingChat) return existingChat;
            const chat = await chatRepository.createChat();
            if (!chat) throw new Error('Failed to create chat');
            const chatUsers = await chatUserService.createChatUsers(
                chat,
                users
            );
            if (!chatUsers) throw new Error('Failed to create chat users');
            return { ...chat, users: chatUsers };
        });
    } catch (error) {
        console.error('Failed to create chat with users', error);
    }
};

export const getChatByUUIDs = async (users: User[]) => {
    try {
        const userUUIDs = users.map((user) => user.UUID);
        const data = {
            userUUIDs
        };
        const chat = await chatRepository.getChatByUUIDs(data);
        return chat;
    } catch (error) {
        console.error('Failed to get chat by UUIDs', error);
    }
};

export const getManyChatsByUUID = async (userUUID: string) => {
    try {
        const data = {
            userUUID
        };
        const chats = await chatRepository.getManyChatsByUUID(data);
        return chats;
    } catch (error) {
        console.error('Failed to get many chats by UUID', error);
    }
};
