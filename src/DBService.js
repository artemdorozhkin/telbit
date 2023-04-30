import { Sequelize } from 'sequelize';

export default class DBService {
  port;
  sequelize;

  constructor(config, dialect) {
    this.port = config.get('DB_PORT');
    this.sequelize = new Sequelize(
      config.get('DB_NAME'),
      config.get('DB_LOGIN'),
      config.get('DB_PASSWORD'),
      {
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
      console.log(`database runing on port ${this.port}`);
    } catch (e) {
      /* eslint-disable-next-line */
      console.log(`can't start database: ${e}`);
    }
  }
}
