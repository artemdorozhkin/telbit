import { Scenes } from 'telegraf';
import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';
import CategoryController from '../controllers/CategoryController.js';
import CancelScene from './cancel.scene.js';
import CostDTO from '../models/dto/Cost.dto.js';

export default class AddCategoryScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'ADD_CATEGORY';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter((ctx) => {
      ctx.reply('Напишите название новой категории', keyboards.cancel());
    });

    this.scene.on('text', async (ctx) => {
      const category = ctx.message.text;
      await CategoryController.create(category);
      const id = await CategoryController.getId(category);

      CostDTO.category = category;
      ctx.reply(`Добавлена категория: ${id} ${category}`);
      return ctx.scene.leave();
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    return this.scene;
  }
}
