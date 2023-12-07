import { Logger } from 'tslog';
import ConfigService from './config/configService.js';

const log = new Logger({
  minLevel: new ConfigService().get('LOG_LEVEL'),
  prettyLogTemplate: '{{dateIsoStr}} [{{logLevelName}}] ',
});

export default log;
