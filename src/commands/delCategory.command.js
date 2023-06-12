import { accessDeniedMsg } from '../common/constants.js';
import { hasAccess } from '../common/utils.js';
import DelCategoryScene from './../scenes/delCategory.scene.js';

export default class DelCategoryCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/удалить категорию/i, (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg);
      }
      new DelCategoryScene().start(ctx);
    });
  }
}
