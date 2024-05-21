import { database } from 'api/components/sequelize';
import type { ChatAttributes } from 'api/models/chat';
import type { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';

export const getChatModel = () => {
    const { Chat } = database.getModels();
    return Chat;
};

// Create
export const createOne = async (data: ChatAttributes) => {
    return getChatModel().create(data);
};

export const createMany = async (data: ChatAttributes[]) => {
    return getChatModel().bulkCreate(data);
};

// Find
export const findOne = async (options?: FindOptions) => {
    return getChatModel().findOne(options);
};

export const findMany = async (options?: FindOptions) => {
    return getChatModel().findAll(options);
};

export const findByUUID = async (uuid: string) => {
    return getChatModel().findByPk(uuid);
};

// Delete
export const deleteOne = async (options?: DestroyOptions) => {
    return deleteMany({ ...options, limit: 1 });
};

export const deleteMany = async (options?: DestroyOptions) => {
    return getChatModel().destroy(options);
};

// Update
export const updateOne = async (
    data: Partial<ChatAttributes>,
    options: UpdateOptions
) => {
    return updateMany(data, { ...options, limit: 1 });
};

export const updateMany = async (
    data: Partial<ChatAttributes>,
    options: UpdateOptions
) => {
    return getChatModel().update(data, options);
};
