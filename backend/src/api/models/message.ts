import { Model, DataType } from 'sequelize-typescript';
import { sequelize } from 'api/components/sequelize';
import { UserModel } from './user';
import { ChatModel } from './chat';

const { DATABASE_SCHEMA } = process.env;
const { STRING } = DataType;

export class MessageModel extends Model {}

export const Message = {
    model: MessageModel,
    init: async () => {
        sequelize.define(
            'Message',
            {
                uid: {
                    primaryKey: true,
                    type: STRING,
                    allowNull: false,
                    field: 'uuid'
                }
            },
            {
                schema: DATABASE_SCHEMA,
                tableName: 'messages',
                modelName: 'Message',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
    }
};
