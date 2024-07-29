import { Scenes } from 'telegraf';
import CancelScene from './cancel.scene.js';
import EditAmountScene from './editAmount.scene.js';
import EditSubjectScene from './editSubject.scene.js';
import EditCategoryScene from './editCategory.scene.js';
import EditMonthScene from './editMonth.scene.js';
import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';

export default class EditCostScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'NEW_EDIT_COST';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter(async (ctx) => {
      ctx.editMessageText('Что изменить?', keyboards.editCost());
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    this.scene.action(actions.CHANGE_AMOUNT, (ctx) => {
      return new EditAmountScene().start(ctx);
    });

    this.scene.action(actions.CHANGE_SUBJECT, (ctx) => {
      return new EditSubjectScene().start(ctx);
    });

    this.scene.action(actions.CHANGE_CATEGORY, (ctx) => {
      return new EditCategoryScene().start(ctx);
    });

    this.scene.action(actions.CHANGE_MONTH, (ctx) => {
      return new EditMonthScene().start(ctx);
    });

    return this.scene;
  }
}
