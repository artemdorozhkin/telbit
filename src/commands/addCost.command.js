import { accessDeniedMsg } from '../common/constants.js';
import AddCostScene from '../scenes/addCost.scene.js';

export default class AddCostCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/^\b[0-9\,\.]+\b$/i, (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg)
      }
      new AddCostScene().start(ctx);
    });
  }
}
