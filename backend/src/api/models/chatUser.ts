import { Model, DataType } from 'sequelize-typescript';
import { database } from 'api/components/sequelize';

const { DATABASE_SCHEMA } = process.env;
const { STRING } = DataType;

export class ChatUserModel extends Model {}

export const ChatUser = {
    model: ChatUserModel,
    init: async () => {
        database.sequelize.define(
            'ChatUser',
            {
                chat_uid: {
                    primaryKey: true,
                    type: STRING,
                    allowNull: false,
                    field: 'chat_uid'
                },
                user_uuid: {
                    primaryKey: true,
                    type: STRING,
                    allowNull: false,
                    field: 'user_uuid'
                }
            },
            {
                schema: DATABASE_SCHEMA,
                tableName: 'chatUsers',
                modelName: 'ChatUser',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
    }
};
