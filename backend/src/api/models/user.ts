import { Model, DataType } from 'sequelize-typescript';
import { database } from 'api/components/sequelize';

const { DATABASE_SCHEMA } = process.env;
const { STRING } = DataType;

export type UserAttributes = {
    uuid: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
};

export class UserModel extends Model {}

export const User = {
    model: UserModel,
    init: async () => {
        database.sequelize.define(
            'User',
            {
                uuid: {
                    primaryKey: true,
                    type: STRING,
                    allowNull: false,
                    field: 'uuid'
                },
                firstName: {
                    type: STRING,
                    allowNull: false,
                    field: 'first_name'
                },
                lastName: {
                    type: STRING,
                    allowNull: false,
                    field: 'last_name'
                },
                passwordHash: {
                    type: STRING,
                    allowNull: false,
                    field: 'password_hash'
                }
            },
            {
                schema: DATABASE_SCHEMA,
                tableName: 'users',
                modelName: 'User',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
    }
};
