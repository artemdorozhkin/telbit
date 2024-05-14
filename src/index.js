import Telbit from './telbit.js';
import ConfigService from './common/config/configService.js';
import CommandsService from './commands/commandsService.js';
import log from './common/logging.js';
import telbitScenes from './scenes/index.js';

const telbit = new Telbit(
  new ConfigService(),
  new CommandsService(),
  log,
  telbitScenes
);
telbit.start();
