import type { User } from '@prisma/client';
import { chatRepository } from 'api/repositories';
import { chatUserService } from 'api/services';

export const createChatWithUsers = async (users: User[]) => {
    try {
        const chat = await chatRepository.createChat();
        if (!chat) throw new Error('Failed to create chat');
        const chatUsers = await chatUserService.createChatUsers(chat, users);
        if (!chatUsers) throw new Error('Failed to create chat users');
        return { ...chat, users: chatUsers };
    } catch (error) {
        console.error('Failed to create chat with users', error);
    }
};
