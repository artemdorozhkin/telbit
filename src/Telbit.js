import { Telegraf, Scenes, session } from 'telegraf';
import telbitScenes from './scenes/index.js';
import log from './common/logging.js'

export default class Telbit {
  bot;
  stage;
  commands;

  constructor(config, commands) {
    log.info("creating bot instance")
    this.bot = new Telegraf(config.get('TOKEN'));
    this.stage = new Scenes.Stage(telbitScenes);

    this.bot.use(session());
    this.bot.use(this.stage.middleware());
    this.commands = commands.get(this.bot);
  }

  start() {
    log.info("starting bot")
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
    log.info("bot is working!")
  }

}
