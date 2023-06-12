import { Scenes } from 'telegraf';

import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';

import CostDTO from '../models/dto/Cost.dto.js';
import { MONTHS_PATTERN, MONTH_NAMES } from '../common/constants.js';
import ConfirmCostScene from './confirmCost.scene.js';
import CancelScene from './cancel.scene.js';
import AddCategoryScene from './addCategory.scene.js';
import CostController from '../controllers/CostController.js';

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
      CostDTO.amount = this.getAmount(ctx.message.text);
      ctx.reply('Что оплатили?', keyboards.cancel());
    });

    this.scene.on('text', async (ctx) => {
      CostDTO.subject = ctx.message.text;
      const categoryName = await CostController.getCategoryNameBy(
        CostDTO.subject
      );
      if (categoryName) {
        CostDTO.category = categoryName;
        return new ConfirmCostScene().start(ctx);
      }
      ctx.reply('Выберите категорию расхода', await keyboards.categories());
    });

    this.scene.action(new RegExp(`^${actions.CATEGORY}`), (ctx) => {
      CostDTO.category = ctx.callbackQuery.data.replace(actions.CATEGORY, '');
      return new ConfirmCostScene().start(ctx);
    });

    this.scene.action(actions.ADD_CATEGORY, (ctx) => {
      new AddCategoryScene().start(ctx);
      return new ConfirmCostScene().start(ctx);
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

  getAmount(text) {
    const cleanText = this.clearText(text);
    const haveOperators = this.isHaveOperators(text);
    if (haveOperators) {
      return eval(text);
    } else {
      return +cleanText;
    }
  }

  clearText(text) {
    return text.replace(',', '.').trim();
  }

  isHaveOperators(text) {
    return /[\+\-\*\/]+/.test(text);
  }
}
