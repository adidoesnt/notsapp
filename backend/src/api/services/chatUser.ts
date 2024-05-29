import type { Chat, ChatUser, User } from '@prisma/client';
import { chatUserRepository } from 'api/repositories';
import { userService } from 'api/services';

export const createChatUsers = async (chat: Chat, users: User[]) => {
    try {
        if (users?.length < 2)
            throw new Error('Not enough users to create chat');
        const chatUsers = users.map((user) => ({
            chatUID: chat.UID,
            userUUID: user.UUID
        }));
        const chatUsersCreated =
            await chatUserRepository.createChatUsers(chatUsers);
        const result =
            chatUsersCreated?.map(async (chatUser) => {
                chatUser = {
                    ...chatUser,
                    user: await userService.getUserByUUID(chatUser.userUUID)
                } as ChatUser;
                return chatUser;
            }) ?? [];
        return await Promise.all(result);
    } catch (error) {
        console.error('Failed to create chat users', error);
    }
};
