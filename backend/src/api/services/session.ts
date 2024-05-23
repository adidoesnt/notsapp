import { sessionRepository } from 'api/repositories';

export const createSession = async (
    token: string,
    isRefreshToken?: boolean
) => {
    try {
        const createdSession = await sessionRepository.createSession({
            token,
            isRefreshToken: !!isRefreshToken
        });
        return createdSession;
    } catch (error) {
        console.error('Failed to create session', error);
    }
};

export const getSessionByToken = async (token: string) => {
    try {
        const foundSession = await sessionRepository.getSessionByToken(token);
        return foundSession;
    } catch (error) {
        console.error('Failed to find session by token', error);
        return null;
    }
};
