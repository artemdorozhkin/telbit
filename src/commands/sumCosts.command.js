import CostController from '../controllers/costController.js';
import * as keyboards from '../common/inlineKeyboards.js';
import { hasAccess } from '../common/utils.js';
import { MONTHS_PATTERN, accessDeniedMsg } from '../common/constants.js';
import log from '../common/logging.js';

export default class SumCostsCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
    this.msg = null;
  }

  handle() {
    this.bot.command('sumday', async (ctx) => {
      log.info(`${ctx.from.first_name} смотрит сумму за день`);
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg);
      }
      const sum = await CostController.getTodaySum();

      const costs = [];
      costs.push('<b>Расходы за сегодня</b>\n');
      let total = 0;
      sum.forEach((s) => {
        total += +s.total;
        costs.push(`${s.subject}: ${s.total}`);
      });
      costs.push(`\n<b>Итого</b>: ${total.toFixed(2)}`);

      if (costs.length === 1) {
        return ctx.reply('На сегодня расходов нет 🤗');
      }
      ctx.replyWithHTML(costs.join('\n'));
    });

    this.bot.command('summonth', async (ctx) => {
      log.info(`${ctx.from.first_name} смотрит сумму за месяц`);
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg);
      }
      this.msg = await ctx.reply(
        'Выберите месяц для отчета',
        keyboards.months()
      );
    });

    this.bot.action(MONTHS_PATTERN, async (ctx) => {
      await ctx.deleteMessage(this.msg.message_id);
      const month = ctx.callbackQuery.data;
      const sum = await CostController.getSumByCategoty(month);
      if (!sum) {
        await ctx.reply(`За ${month} не нашел расходов🤨`);
        return;
      }

      let total = 0;
      const categories = [];
      sum.forEach((s) => {
        categories.push(`${s['categoryName']}: ${+s['amount'].toFixed(2)}`);
        total += +s['amount'];
      });

      categories.push(`<b>Общая сумма за ${month}:</b> ${total.toFixed(2)}`);
      await ctx.replyWithHTML(categories.join('\n'));
    });
  }
}
