import { Telegraf, Scenes, session } from 'telegraf';

export default class Telbit {
  _bot;
  _stage;
  _commands;
  _log;

  constructor(config, commands, log, scenes) {
    this._log = log;
    this._log.info('creating bot instance');
    this._bot = new Telegraf(config.get('TOKEN'));
    this._stage = new Scenes.Stage(scenes);

    this._bot.use(session());
    this._bot.use(this._stage.middleware());
    this._commands = commands.get(this._bot);
  }

  start() {
    this._log.info('starting bot');
    for (const command of this._commands) {
      command.handle();
    }

    this._bot.launch();
    this._bot.inlineQuery('a', (ctx) => ctx.from.first_name);
    this._log.info('bot is working!');
  }
}
