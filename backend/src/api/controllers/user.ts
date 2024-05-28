import { userService } from 'api/services';
import { ERR } from 'constants/response';
import type { ControllerProps } from 'api/controllers';

const { SIGNUP, LOGIN } = ERR;

export const login = async ({ request, response, next }: ControllerProps) => {
    try {
        const { username, password } = request.body;
        const loggedInUser = await userService.login(username, password);
        if (!loggedInUser) {
            const { status, message } = LOGIN.INVALID;
            return response.status(status).json({ message });
        }
        const { passwordHash, ...userWithoutPassword } = loggedInUser;
        response.json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Failed to login user', error);
        next(error);
    }
};

export const signup = async ({ request, response, next }: ControllerProps) => {
    try {
        const { username, password, firstName, lastName } = request.body;
        const user = await userService.signup({
            username,
            password,
            firstName,
            lastName
        });
        if (!user) {
            const { status, message } = SIGNUP.USER_EXISTS;
            return response.status(status).json({ message });
        }
        const { passwordHash, ...userWithoutPassword } = user;
        response.json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Failed to signup user', error);
        next(error);
    }
};
