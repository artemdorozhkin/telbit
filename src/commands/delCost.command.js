import * as actions from '../common/actions.js';
import * as keyboards from '../common/inlineKeyboards.js';
import CostController from '../controllers/CostController.js';
import costModelToObject from '../common/utils.js';
import CostDTO from '../models/dto/Cost.dto.js';
import CancelScene from '../scenes/cancel.scene.js';

export default class DeleteCostCommand {
  bot;
  idToDel;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.action(new RegExp(actions.DEL), async (ctx) => {
      const match = new RegExp(`${actions.DEL}(\\d+)`).exec(
        ctx.callbackQuery.data
      );
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
