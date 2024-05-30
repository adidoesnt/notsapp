import { messageService } from 'api/services';
import type { ControllerProps } from './types';

export const getMessagesByChatUID = async ({
    request,
    response,
    next
}: ControllerProps) => {
    try {
        const { chatUID } = request.params;
        const messages = await messageService.getMessagesByChatUID(chatUID);
        response.json({ messages });
    } catch (error) {
        console.error('Failed to get messages by chat UID', error);
        next(error);
    }
};
