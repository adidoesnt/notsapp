import { ERR } from 'constants/response';
import type { ControllerProps } from 'api/controllers';
import { chatService } from 'api/services';

export const createChatWithUsers = async ({
    request,
    response,
    next
}: ControllerProps) => {
    try {
        const { users } = request.body;
        if (users?.length < 2) {
            const { status, message } = ERR.BAD_REQUEST;
            return response.status(status).json({
                message,
                hint: 'Chat creation requires at least two users'
            });
        }
        const chat = await chatService.createChatWithUsers(users);
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
