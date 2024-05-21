import { Model, DataType } from 'sequelize-typescript';
import { database } from 'api/components/sequelize';

const { DATABASE_SCHEMA } = process.env;
const { STRING } = DataType;

export class MessageModel extends Model {}

export const Message = {
    model: MessageModel,
    init: async () => {
        database.sequelize.define(
            'Message',
            {
                uid: {
                    primaryKey: true,
                    type: STRING,
                    allowNull: false,
                    field: 'uid'
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
