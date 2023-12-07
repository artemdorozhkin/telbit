import { Scenes } from 'telegraf';
import * as keyboards from '../common/inlineKeyboards.js';
import * as actions from '../common/actions.js';
import CategoryController from '../controllers/categoryController.js';
import CancelScene from './cancel.scene.js';

export default class DelCategoryScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'DEL_CATEGORY';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter(async (ctx) => {
      ctx.reply(
        'Выберите категорию для удаления',
        await keyboards.categories(1, true)
      );
    });

    this.scene.action(new RegExp(`^${actions.CATEGORY}`), async (ctx) => {
      const match = new RegExp(`${actions.CATEGORY}\\s*(.*)\\s+\\d+`).exec(
        ctx.callbackQuery.data
      );
      if (match) {
        const [, category] = match;
        console.log(category);
        if (category) {
          await CategoryController.delete(category);
          ctx.reply(`Удалена категория: ${category}`);
        }
      } else {
        ctx.reply('Не удалось найти категорию');
      }
      return ctx.scene.leave();
    });

    this.scene.action(actions.CANCEL, (ctx) => {
      return new CancelScene().start(ctx);
    });

    return this.scene;
  }
}
