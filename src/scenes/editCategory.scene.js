import { Scenes } from 'telegraf';
import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';
import ConfirmCostScene from './confirmCost.scene.js';
import CostDTO from '../models/dto/Cost.dto.js';
import CancelScene from './cancel.scene.js';

export default class EditCategoryScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'EDIT_CATEGORY';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter(async (ctx) => {
      ctx.editMessageText(
        'Выберите категорию расхода',
        await keyboards.categories()
      );
    });

    this.scene.action(actions.ADD_CATEGORY, (ctx) => {
      return new AddCategoryScene().start(ctx);
    });

    this.scene.action(new RegExp(actions.CATEGORY), (ctx) => {
      CostDTO.category = ctx.callbackQuery.data.replace(actions.CATEGORY, '');
      return new ConfirmCostScene().start(ctx);
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    return this.scene;
  }
}
