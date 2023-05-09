import { config } from 'dotenv';

class ConfigService {
  config;

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error('Не удалось найти файл .env');
    }

    if (!parsed) {
      throw new Error('В файле .env нет данных');
    }

    this.config = parsed;
  }

  get(key) {
    const value = this.config[key];
    if (!value) {
      throw new Error(`Ключ [${key}] не найден`);
    }
    return value;
  }
}

export default ConfigService;
