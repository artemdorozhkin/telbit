import { hasAccess } from '../common/utils.js';
import { accessDeniedMsg } from '../common/constants.js';
import CategoryController from '../controllers/CategoryController.js';

export default class PrintCategoriesCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/категории/i, async (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg)
      }
      const categories = await CategoryController.getAll();
      const count = categories.length;
      ctx.reply(`Сейчас количество категорий: ${count}`);
      ctx.reply(categories.map((c) => c.name).join('\n'));
    });
  }
}
