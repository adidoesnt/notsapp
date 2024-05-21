import { Model, DataType, addAssociation } from 'sequelize-typescript';
import { sequelize } from 'api/components/sequelize';

const { DATABASE_SCHEMA } = process.env;
const { STRING } = DataType;

export class ChatModel extends Model {}

export const Chat = {
    model: ChatModel,
    init: async () => {
        sequelize.define(
            'Chat',
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
                tableName: 'chats',
                modelName: 'Chat',
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
    }
};
