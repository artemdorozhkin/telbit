import { Scenes } from 'telegraf';
import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';
import CancelScene from './cancel.scene.js';
import ConfirmCostScene from './confirmCost.scene.js';
import CostDTO from '../models/dto/Cost.dto.js';

export default class EditSubjectScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'EDIT_SUBJECT';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter((ctx) => {
      ctx.editMessageText('Что оплатили?', keyboards.cancel());
    });

    this.scene.on('text', (ctx) => {
      CostDTO.subject = ctx.message.text;
      return new ConfirmCostScene().start(ctx);
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    return this.scene;
  }
}
