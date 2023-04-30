import { Scenes } from 'telegraf';
import CostDTO from '../models/dto/Cost.dto.js';
import ConfirmCostScene from './confirmCost.scene.js';
import CancelScene from './cancel.scene.js';
import isNumber from 'is-number';
import * as actions from '../common/actions.js';
import * as keyboards from '../common/inlineKeyboards.js';

export default class EditAmountScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'EDIT_AMOUNT';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter((ctx) => {
      ctx.reply('Введите сумму цифрами', keyboards.cancel());
    });

    this.scene.on('text', (ctx) => {
      const response = ctx.message.text.replace(',', '.').trim();

      if (!isNumber(response)) {
        return this.start(ctx);
      }

      CostDTO.amount = +response;
      return new ConfirmCostScene().start(ctx);
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    return this.scene;
  }
}
