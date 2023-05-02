import { accessDeniedMsg } from '../common/constants.js';
import { hasAccess } from '../common/utils.js';
import AddCategoryScene from '../scenes/addCategory.scene.js';

export default class AddCategoryCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/категория/i, (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg)
      }
      new AddCategoryScene().start(ctx);
    });
  }
}
