import { Sequelize } from 'sequelize';
import log from './common/logging.js';

export default class DBService {
  port;
  sequelize;

  constructor(config, dialect) {
    this.port = config.get('DB_PORT');
    this.sequelize =
      process.env.NODE_ENV === 'production'
        ? new Sequelize(config.get('DB_URL'), {
            logging: (msg) => log.debug('database', msg),
            dialect,
          })
        : new Sequelize(
            config.get('DB_NAME'),
            config.get('DB_LOGIN'),
            config.get('DB_PASSWORD'),
            {
              logging: (msg) => log.debug('database', msg),
              dialect,
              host: config.get('DB_HOST'),
              port: this.port,
            }
          );
  }

  start() {
    try {
      this.sequelize.authenticate();
      this.sequelize.sync();
      /* eslint-disable-next-line */
      log.info(`database runing on port ${this.port}`);
    } catch (e) {
      /* eslint-disable-next-line */
      log.error(`can't start database: ${e}`);
      throw error;
    }
  }
}
