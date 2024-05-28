import { v4 as uuidv4 } from 'uuid';
import { chatUserRepository } from 'api/repositories';
import type { User } from '@prisma/client';

export const createChatWithUsers = async (users: User[]) => {
    try {
        const chatUID = uuidv4();
        const chatUsers = users.map((user) => {
            const { UUID: userUUID } = user;
            return {
                chatUID,
                userUUID
            };
        });
        const chat = await chatUserRepository.createManyChatUsers(chatUsers);
        return chat ?? null;
    } catch (error) {
        console.error('Failed to create chat with users', error);
        return null;
    }
};
