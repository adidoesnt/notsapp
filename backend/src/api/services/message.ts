import { messageRepository } from 'api/repositories';
import type { FindManyMessagesAttributes } from 'api/repositories/message';

export type CreateMessageAttributes = {
    fromUUID: string;
    content: string;
    timestamp: Date;
    roomId: string;
};

export const createMessage = async ({
    content,
    fromUUID,
    roomId,
    timestamp
}: CreateMessageAttributes) => {
    try {
        const data = {
            chatUID: roomId,
            content,
            senderUUID: fromUUID,
            timestamp
        };
        const message = await messageRepository.createMessage(data);
        return message;
    } catch (error) {
        console.error('Failed to create message', error);
        return null;
    }
};

export const getMessagesByChatUID = async (chatUID: string) => {
    const where: FindManyMessagesAttributes['where'] = {
        chatUID
    };
    const select: FindManyMessagesAttributes['select'] = {
        UID: true,
        content: true,
        timestamp: true,
        senderUUID: true,
        sender: {
            select: {
                UUID: true,
                username: true,
                firstName: true,
                lastName: true
            }
        }
    };
    const data = { where, select };
    try {
        const messages = await messageRepository.getMessagesByChatUID(data);
        const formattedMessages = messages?.map((message) => {
            const { senderUUID, ...rest } = message;
            return {
                ...rest,
                fromUUID: senderUUID
            };
        });
        return formattedMessages;
    } catch (error) {
        console.error('Failed to get messages by chat UID', error);
        return null;
    }
};
