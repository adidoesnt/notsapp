import { database } from 'api/components/sequelize';
import type { UserAttributes } from 'api/models/user';
import type { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';

export const getUserModel = () => {
    const { User } = database.getModels();
    return User;
};

// Create
export const createOne = async (data: UserAttributes) => {
    return getUserModel().create(data);
};

export const createMany = async (data: UserAttributes[]) => {
    return getUserModel().bulkCreate(data);
};

// Find
export const findOne = async (options?: FindOptions) => {
    return getUserModel().findOne(options);
};

export const findMany = async (options?: FindOptions) => {
    return getUserModel().findAll(options);
};

export const findByUUID = async (uuid: string) => {
    return getUserModel().findByPk(uuid);
};

// Delete
export const deleteOne = async (options?: DestroyOptions) => {
    return deleteMany({ ...options, limit: 1 });
};

export const deleteMany = async (options?: DestroyOptions) => {
    return getUserModel().destroy(options);
};

// Update
export const updateOne = async (
    data: UserAttributes,
    options: UpdateOptions
) => {
    return updateMany(data, { ...options, limit: 1 });
};

export const updateMany = async (
    data: UserAttributes,
    options: UpdateOptions
) => {
    return getUserModel().update(data, options);
};
