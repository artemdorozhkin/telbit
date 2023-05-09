import Telbit from './Telbit.js';
import ConfigService from './common/config/ConfigService.js';
import CommandsService from './commands/CommandsService.js';

const telbit = new Telbit(new ConfigService(), new CommandsService());
telbit.start();
