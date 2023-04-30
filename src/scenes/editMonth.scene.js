import { Scenes } from 'telegraf';
import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';
import { MONTHS_PATTERN } from '../common/constants.js';
import ConfirmCostScene from './confirmCost.scene.js';
import CostDTO from '../models/dto/Cost.dto.js';
import CancelScene from './cancel.scene.js';

export default class EditMonthScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'EDIT_MONTH';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter((ctx) => {
      ctx.editMessageText('Выберите месяц расхода', keyboards.months());
    });

    this.scene.action(MONTHS_PATTERN, (ctx) => {
      CostDTO.month = ctx.callbackQuery.data;
      return new ConfirmCostScene().start(ctx);
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    return this.scene;
  }
}
