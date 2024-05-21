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

export const sequelize = new Sequelize({
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    schema: DATABASE_SCHEMA,
    dialect: 'postgres'
});

const addAssociations = (sequelize: Sequelize) => {
    const { Message, User, Chat, ChatUser } =
        sequelize.models;

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
};

export const database = {
    init: async () => {
        try {
            await sequelize.authenticate();
            await Promise.all(
                Object.values(models).map(async (model) => model.init())
            );
            console.log('Connection has been established successfully.');
            await sequelize.sync();
            addAssociations(sequelize);
            console.log('All models were synchronized successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
};
