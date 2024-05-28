import { ERR } from 'constants/response';
import type { ControllerProps } from './types';
import { chatUserService } from 'api/services';

export const createChatWithUsers = async ({
    request,
    response,
    next
}: ControllerProps) => {
    try {
        const { users } = request.body;
        const chat = await chatUserService.createChatWithUsers(users);
        if (!chat) {
            const { status, message } = ERR.INTERNAL;
            return response.status(status).json({ message });
        }
        response.json({ chat });
    } catch (error) {
        console.error('Failed to create chat with users', error);
        next(error);
    }
};
