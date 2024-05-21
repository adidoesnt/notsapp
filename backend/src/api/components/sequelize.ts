import { Sequelize } from 'sequelize';
import * as models from 'api/models';

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_SCHEMA
} = process.env;

export class Database {
    sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            host: DATABASE_HOST,
            port: Number(DATABASE_PORT),
            database: DATABASE_NAME,
            username: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            schema: DATABASE_SCHEMA,
            dialect: 'postgres'
        });
    }

    addAssociations() {
        const { Message, User, Chat, ChatUser } = this.sequelize.models;

        Message.belongsTo(User, {
            as: 'sender',
            foreignKey: 'sender_uuid'
        });

        Message.belongsTo(Chat, {
            as: 'chat',
            foreignKey: 'chat_uid'
        });

        User.belongsToMany(Chat, {
            through: ChatUser,
        });
    }

    async init() {
        try {
            await this.sequelize.authenticate();
            await Promise.all(
                Object.values(models).map(async (model) => model.init())
            );
            console.log('Connection has been established successfully.');
            await this.sequelize.sync();
            this.addAssociations();
            console.log('All models were synchronized successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    getModels() {
        return this.sequelize.models;
    }
}

export const database = new Database();
