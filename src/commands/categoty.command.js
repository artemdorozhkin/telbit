import * as scenes from '../common/scenes.js';

export default class Category {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/категория/i, (ctx) => {
      ctx.scene.enter(scenes.ADD_CATEGORY);
    });
  }
}
