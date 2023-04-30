import * as scenes from '../common/scenes.js';

export default class LastCosts {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/последни[ей]\s*\d*/i, async (ctx) => {
      ctx.scene.enter(scenes.LAST_COSTS);
    });
  }
}
