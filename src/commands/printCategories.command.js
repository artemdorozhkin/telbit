import { hasAccess } from '../common/utils.js';
import { accessDeniedMsg } from '../common/constants.js';
import CategoryController from '../controllers/categoryController.js';

export default class PrintCategoriesCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/категории/i, async (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg);
      }
      const categories = await CategoryController.getAll();
      const count = categories.length;
      let msgText = `Сейчас количество категорий: <b>${count}</b>\n\n`;
      msgText += categories.map((c) => c.name).join('\n');
      ctx.reply(msgText);
    });
  }
}
