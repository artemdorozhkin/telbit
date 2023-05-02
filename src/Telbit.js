import { Telegraf, Scenes, session } from 'telegraf';
import telbitScenes from './scenes/index.js';

export default class Telbit {
  bot;
  stage;
  commands;

  constructor(config, commands) {
    this.bot = new Telegraf(config.get('TOKEN'));
    this.stage = new Scenes.Stage(telbitScenes);

    this.bot.use(session());
    this.bot.use(this.stage.middleware());
    this.commands = commands.get(this.bot);
  }

  start() {
    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
  }

}
