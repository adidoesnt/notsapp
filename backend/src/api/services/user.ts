import type { User } from '@prisma/client';
import { userRepository } from 'api/repositories';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { sessionService } from 'api/services';

const { SALT_ROUNDS = 10, JWT_SECRET } = process.env;

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

const getJWT = async (user: User) => {
    const { UUID, username } = user;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET not set!');
    }
    const token = sign({ UUID, username }, JWT_SECRET, {
        expiresIn: '15 minutes'
    });
    const createdSession = await sessionService.createSession(token);
    if (!createdSession) return null;
    return token;
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
            if (!createdUser)
                throw new Error(`Failed to create user ${username}!`);
            const token = await getJWT(createdUser);
            if (!token)
                throw new Error(`Failed to create session for ${username}!`);
            console.log(`Completed signup for ${username}`);
            return { ...createdUser, token };
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
                const token = await getJWT(user);
                if (!token)
                    throw new Error(
                        `Failed to create session for ${username}!`
                    );
                console.log(`Completed login for ${username}`);
                return { ...user, token };
            } else {
                throw new Error(`Invalid password for ${username}!`);
            }
        }
    } catch (error) {
        console.error('Error completing login', error);
    }
};

export const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
        if (!users) throw new Error('No users found!');
        const usersWithoutPasswordHash = users.map(
            ({ passwordHash, ...user }) => user
        );
        return usersWithoutPasswordHash;
    } catch (error) {
        console.error('Failed to get all users', error);
    }
};
