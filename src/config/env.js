import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  bot: {
    token: process.env.TOKEN,
  },
  db: {
    name: process.env.DB_NAME,
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  access: {
    users: process.env.USERS,
  },
};

export default config;
