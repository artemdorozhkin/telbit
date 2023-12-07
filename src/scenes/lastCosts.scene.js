import { Scenes } from 'telegraf';
import CostController from '../controllers/costController.js';
import * as keyboards from '../common/inlineKeyboards.js';

export default class LastCostsScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'LAST_COSTS';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  get() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter(async (ctx) => {
      let [, category, lastNumber] = /([а-яё]*)?\s*последни[е|й]\s*(\d*)/i.exec(
        ctx.message.text
      );

      if (!category) {
        category = '';
      }
      let costs;
      if (!lastNumber) {
        costs = await CostController.getTopN(1, category);
      } else if (lastNumber) {
        costs = await CostController.getTopN(lastNumber, category);
      }

      if (!costs) return ctx.scene.leave();

      costs.forEach((c) => {
        this.printCostCard(ctx, c);
      });
    });

    return this.scene;
  }

  printCostCard(ctx, cost) {
    ctx.reply(
      `(${cost.category.name}) ${cost.subject}: ${cost.amount}`,
      keyboards.costCard(cost.id)
    );
  }
}
