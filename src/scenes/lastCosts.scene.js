import { Scenes } from 'telegraf';
import CostController from '../controllers/costController.js';

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

      let cards = '';
      const MAX_LENGTH = 4096;
      costs.forEach(async (cost) => {
        const cardText = this.getCostCard(cost);
        if ((cards + cardText).length >= 4096) {
          await ctx.replyWithHTML(cards);
          cards = '';
        } else {
          cards += cardText;
        }
      });

      if (cards.length > 0) {
        await ctx.replyWithHTML(cards.join('\n'));
      }
    });

    return this.scene;
  }

  getCostCard(cost) {
    return `<b>(${cost.category.name}) ${cost.subject}: <i>${cost.amount}</i></b>\nИзменить: /edit${cost.id}\nУдалить: /del${cost.id}\n`;
  }
}
