export default class PrintCategoriesCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/категории/i, async (ctx) => {
      const categories = await CategoryController.getAll();
      const count = categories.length;
      ctx.reply(`Сейчас количество категорий: ${count}`);
      ctx.reply(categories.map((c) => c.name).join('\n'));
    });
  }
}
