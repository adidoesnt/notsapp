import { Prisma } from '@prisma/client';
import { prisma } from 'index';
import { v4 as uuidV4 } from 'uuid';

export type CreateUserAttributes = Omit<Prisma.UserCreateInput, 'UUID'>;

export const createUser = async (data: CreateUserAttributes) => {
    try {
        const UUID = uuidV4();
        const createdUser = await prisma.user.create({
            data: { ...data, UUID }
        });
        return createdUser;
    } catch (error) {
        console.error('Failed to create user');
    }
};
