import LastCostsScene from '../scenes/lastCosts.scene.js';

export default class LastCostsCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/последни[ей]\s*\d*/i, async (ctx) => {
      new LastCostsScene().start(ctx);
    });
  }
}
