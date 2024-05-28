import type { Chat, User } from '@prisma/client';
import { chatUserRepository } from 'api/repositories';

export const createChatUsers = async (chat: Chat, users: User[]) => {
    try {
        if(users?.length < 2) throw new Error('Not enough users to create chat');
        const chatUsers = users.map((user) => ({
            chatUID: chat.UID,
            userUUID: user.UUID
        }));
        const chatUsersCreated =
            await chatUserRepository.createChatUsers(chatUsers);
        return chatUsersCreated;
    } catch (error) {
        console.error('Failed to create chat users', error);
    }
};
