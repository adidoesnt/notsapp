import { messageRepository } from 'api/repositories';

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
        }
        const message = await messageRepository.createMessage(data);
        return message;
    } catch (error) {
        console.error('Failed to create message', error);
        return null;
    }
};
