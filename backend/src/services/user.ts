import * as userRepository from 'repositories/user';
import { hash, compare } from 'bcrypt';

const { SALT_ROUNDS = 10 } = process.env;

export type SignupAttributes = Omit<
    userRepository.CreateUserAttributes,
    'passwordHash'
> & {
    password: string;
};

const getHashedPassword = async (password: string) => {
    const passwordHash = await hash(password, Number(SALT_ROUNDS));
    return passwordHash;
};

export const signup = async ({
    username,
    password,
    ...attributes
}: SignupAttributes) => {
    try {
        const usernameTaken =
            !!(await userRepository.getUserByUsername(username));
        if (usernameTaken) {
            throw new Error(`Username ${username} is taken!`);
        } else {
            const passwordHash = await getHashedPassword(password);
            const createdUser = await userRepository.createUser({
                username,
                passwordHash,
                ...attributes
            });
            console.log(`Completed signup for ${username}`);
            return createdUser;
        }
    } catch (error) {
        console.error('Error completing signup', error);
    }
};

export const login = async (username: string, password: string) => {
    try {
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            throw new Error(`User ${username} not found!`);
        } else {
            const { passwordHash } = user;
            const passwordMatch = await compare(password, passwordHash);
            if (passwordMatch) {
                console.log(`Completed login for ${username}`);
                return user;
            } else {
                throw new Error(`Invalid password for ${username}!`);
            }
        }
    } catch (error) {
        console.error('Error completing login', error);
    }
};
