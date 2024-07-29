import * as actions from '../common/actions.js';
import * as keyboards from '../common/inlineKeyboards.js';
import CostController from '../controllers/costController.js';
import costModelToObject from '../common/utils.js';
import CostDTO from '../models/dto/cost.dto.js';
import CancelScene from '../scenes/cancel.scene.js';

export default class DeleteCostCommand {
  bot;
  idToDel;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(new RegExp('/del'), async (ctx) => {
      const match = new RegExp(`del(\\d+)`).exec(ctx.callbackQuery.data);
      if (!match) {
        ctx.reply('Что-то пошло не так👀');
        return;
      }

      [, this.idToDel] = match;
      const cost = await CostController.getById(this.idToDel);

      if (!cost) {
        ctx.reply('Расход не существует или удален...');
        return;
      }

      costModelToObject(cost);
      ctx.replyWithHTML(
        `Вы уверены, что хотите удалить этот расход?\n<i>(${CostDTO.category}) ${CostDTO.subject}</i>`,
        keyboards.yesNoCancel()
      );
    });

    this.bot.action(actions.YES, async (ctx) => {
      await CostController.delById(this.idToDel);
      ctx.replyWithHTML('Расход успешно удален!❌');
    });

    this.bot.action(actions.NO, (ctx) => {
      return new CancelScene().start(ctx);
    });

    this.bot.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });
  }
}
