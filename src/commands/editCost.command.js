import * as actions from '../common/actions.js';
import CostController from '../controllers/costController.js';
import costModelToObject from '../common/utils.js';
import EditCostScene from '../scenes/editCost.scene.js';

export default class EditCostCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/\/edit\d+/i, async (ctx) => {
      const match = /\/edit(\d+)/i.exec(ctx.message.text);
      if (!match) {
        ctx.reply('Что-то пошло не так👀');
        return;
      }

      const cost = await CostController.getById(match[1]);

      if (!cost) {
        ctx.reply('Расход не существует или удален...');
        return;
      }

      const costDto = costModelToObject(cost);
      return new EditCostScene(costDto).start(ctx);
    });
  }
}
