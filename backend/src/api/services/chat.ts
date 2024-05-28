import type { User } from '@prisma/client';
import { chatRepository } from 'api/repositories';
import { chatUserService } from 'api/services';
import { prisma } from 'index';

export const createChatWithUsers = async (users: User[]) => {
    try {
        return await prisma.$transaction(async (prisma) => {
            const chatAlreadyExists = !!(await getChatByUUIDs(users));
            if (chatAlreadyExists) throw new Error('Chat already exists');
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
