import * as scenes from '../common/scenes.js';

export default class Cost {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/^\b[0-9\,\.]+\b$/i, (ctx) => {
      ctx.scene.enter(scenes.ADD_COST);
    });
  }
}
