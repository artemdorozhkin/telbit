import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_LOGIN,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    },
);

export function start() {
    try {
        sequelize.authenticate();
        sequelize.sync();
        /* eslint-disable-next-line */
        console.log(`database runing on port ${process.env.DB_PORT}`);
    } catch (e) {
        /* eslint-disable-next-line */
        console.log(`can't start database: ${e}`);
    }
}
