import Chart from '../Chart.js';
import CostController from '../controllers/CostController.js';
import * as keyboards from '../common/inlineKeyboards.js';
import { hasAccess } from '../common/utils.js';
import { MONTHS_PATTERN, accessDeniedMsg } from '../common/constants.js';
import fs from 'fs';

export default class SumCostsCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.command('sumday', async (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg)
      }
      const sum = await CostController.getTodaySum();

      const costs = [];
      costs.push('<b>Расходы за сегодня</b>\n');
      let total = 0;
      sum.forEach((s) => {
        total += +s.total;
        costs.push(`${s.subject}: ${s.total}`);
      });
      costs.push(`\nИтого: ${total}`);

      if (costs.length === 1) {
        return ctx.reply('На сегодня расходов нет 🤗');
      }
      ctx.replyWithHTML(costs.join('\n'));
    });

    this.bot.command('summonth', async (ctx) => {
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg)
      }
      ctx.reply('Выберите месяц для отчета', keyboards.months());
    });

    this.bot.action(MONTHS_PATTERN, async (ctx) => {
      if (ctx.message) {
        ctx.deleteMessage();
      }
      const month = ctx.callbackQuery.data;
      const sum = await CostController.getSumByCategoty(month);

      const labels = [];
      const data = [];
      sum.forEach((s) => {
        labels.push(s['category.name']);
        data.push(s['total']);
      });

      const chart = new Chart(labels, data, month);
      const imgPath = await chart.getImage('monthReport');

      await ctx.replyWithPhoto({ source: imgPath });
      fs.rmSync(imgPath);
    });
  }
}
