import Telbit from './telbit.js';
import ConfigService from './common/config/configService.js';
import CommandsService from './commands/commandsService.js';

const telbit = new Telbit(new ConfigService(), new CommandsService());
telbit.start();
