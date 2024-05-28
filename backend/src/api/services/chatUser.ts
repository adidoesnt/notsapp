import type { Chat, User } from '@prisma/client';
import { chatUserRepository } from 'api/repositories';

export const createChatUsers = async (chat: Chat, users: User[]) => {
    try {
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
