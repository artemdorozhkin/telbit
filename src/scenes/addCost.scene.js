import { Scenes } from 'telegraf';

import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';

import CostDTO from '../models/dto/Cost.dto.js';
import { MONTHS_PATTERN, MONTH_NAMES } from '../common/constants.js';
import ConfirmCostScene from './confirmCost.scene.js';
import CancelScene from './cancel.scene.js';
import AddCategoryScene from './addCategory.scene.js';

export default class AddCostScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'ADD_COST';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter((ctx) => {
      CostDTO.id = 0;
      const currentMonth = new Date().getMonth();
      CostDTO.month = MONTH_NAMES[currentMonth];
      CostDTO.amount = +ctx.message.text.replace(',', '.').trim();
      ctx.reply('Что оплатили?', keyboards.cancel());
    });

    this.scene.on('text', async (ctx) => {
      CostDTO.subject = ctx.message.text;
      ctx.reply('Выберите категорию расхода', await keyboards.categories());
    });

    this.scene.action(new RegExp(`^${actions.CATEGORY}`), (ctx) => {
      CostDTO.category = ctx.callbackQuery.data.replace(actions.CATEGORY, '');
      return new ConfirmCostScene().start(ctx);
    });

    this.scene.action(actions.ADD_CATEGORY, (ctx) => {
      return new AddCategoryScene().start(ctx);
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    this.scene.use((ctx) => {
      ctx.reply(
        'Выберите действие, или нажмите кнопку Отмена',
        keyboards.cancel()
      );
    });

    return this.scene;
  }
}
