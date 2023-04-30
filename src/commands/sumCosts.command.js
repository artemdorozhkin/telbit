import CostController from '../controllers/CostController.js';

export default class SumCostsCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.command('sumday', async (ctx) => {
      const sum = await CostController.getTodaySum();
      ctx.reply(`Сумма за сегодня: ${sum}`);
    });

    this.bot.command('summonth', async (ctx) => {
      const sum = await CostController.getMonthSum();
      ctx.reply(`Сумма за месяц: ${sum}`);
    });
  }
}
