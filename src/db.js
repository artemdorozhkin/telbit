import { Sequelize } from 'sequelize';
import * as env from './config/keys.js';

export const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_LOGIN,
    env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: env.DB_HOST,
        port: env.DB_PORT,
    },
);

export function start() {
    try {
        sequelize.authenticate();
        sequelize.sync();
        /* eslint-disable-next-line */
        console.log(`database runing on port ${env.DB_PORT}`);
    } catch (e) {
        /* eslint-disable-next-line */
        console.log(`can't start database: ${e}`);
    }
}
