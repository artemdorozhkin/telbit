import AddCostScene from '../scenes/addCost.scene.js';

export default class AddCostCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/^\b[0-9\,\.]+\b$/i, (ctx) => {
      new AddCostScene().start(ctx);
    });
  }
}
