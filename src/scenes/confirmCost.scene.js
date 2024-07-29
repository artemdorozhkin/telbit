import { Scenes } from 'telegraf';
import CostController from '../controllers/costController.js';
import EditCostScene from './editCost.scene.js';

import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';
import CostDTO from '../models/dto/cost.dto.js';

export default class ConfirmCostScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'CONFIRM_COST';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter(async (ctx) => {
      await ctx.reply(
        `<b>Категория</b>: ${CostDTO.category}
<b>Оплатили</b>: ${CostDTO.subject}
<b>Сумма</b>: ${CostDTO.amount}
<b>Месяц</b>: ${CostDTO.month}

Все верно?`,
        {
          parse_mode: 'HTML',
          ...keyboards.yesNoCancel(),
        }
      );
    });

    this.scene.action(actions.YES, async (ctx) => {
      if (CostDTO.id === 0) {
        await CostController.create(CostDTO);
      } else {
        await CostController.update(CostDTO);
      }
      ctx.editMessageText('Расход записан! 👌');
      return ctx.scene.leave();
    });

    this.scene.action(actions.NO, (ctx) => {
      return new EditCostScene(CostDTO).start(ctx);
    });

    return this.scene;
  }
}
