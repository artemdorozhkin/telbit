import { Scenes, Markup } from 'telegraf';
import { Cost } from './cost.scene.js';

import { CONFIRM, CHANGE_COST } from '../common/scenes.js';
import * as actions from '../common/actions.js';
import * as buttons from '../common/buttons.js';
import CostController from '../controllers/costController.js';

const confirmCostScene = new Scenes.BaseScene(CONFIRM);

confirmCostScene.enter((ctx) => {
  const yesNoCancel = [];
  yesNoCancel.push(buttons.yes(), buttons.no());

  ctx.reply(
    `<b>Категория</b>: ${Cost.category}\n<b>Оплатили</b>: ${Cost.subject}\n<b>Сумма</b>: ${Cost.amount}\n<b>Месяц</b>: ${Cost.month}\n\nВсе верно?`,
    {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard(yesNoCancel, buttons.cancel()),
    }
  );
});

confirmCostScene.action(actions.YES, async (ctx) => {
  if (Cost.id === 0) {
    await CostController.create(Cost);
  } else {
    await CostController.update(Cost);
  }
  ctx.editMessageText('Расход записан! 👌');
  return ctx.scene.leave();
});

confirmCostScene.action(actions.NO, (ctx) => ctx.scene.enter(CHANGE_COST));

confirmCostScene.leave(() => {});

export default confirmCostScene;
