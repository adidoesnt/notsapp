import { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidV4 } from 'uuid';

export type CreateUserAttributes = Omit<Prisma.UserCreateInput, 'UUID'>;
export type GetUserAttributes = Prisma.UserFindFirstOrThrowArgs;

export const createUser = async ({
    username,
    ...data
}: CreateUserAttributes) => {
    try {
        const UUID = uuidV4();
        const createdUser = await prisma.user.create({
            data: { ...data, username, UUID }
        });
        console.log(`Created user ${username}`);
        return createdUser;
    } catch (error) {
        console.error('Failed to create user', error);
    }
};

export const getUserByUsername = async (username: string, throws?: boolean) => {
    try {
        const where: GetUserAttributes['where'] = {
            username
        };
        let foundUser;
        if (throws) {
            foundUser = await prisma.user.findFirstOrThrow({
                where
            });
        } else {
            foundUser = await prisma.user.findFirst({
                where
            });
        }
        return foundUser;
    } catch (error) {
        console.error('Failed to find user by username', error);
    }
};
