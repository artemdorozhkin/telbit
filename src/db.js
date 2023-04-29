import { Sequelize } from 'sequelize';
import config from './config/env.js';

export const sequelize = new Sequelize(
  config.db.name,
  config.db.login,
  config.db.password,
  {
    dialect: 'mysql',
    host: config.db.host,
    port: config.db.port,
  }
);

export function start() {
  try {
    sequelize.authenticate();
    sequelize.sync();
    /* eslint-disable-next-line */
    console.log(`database runing on port ${config.db.port}`);
  } catch (e) {
    /* eslint-disable-next-line */
    console.log(`can't start database: ${e}`);
  }
}
