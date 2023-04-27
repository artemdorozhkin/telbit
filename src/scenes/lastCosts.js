import { Markup, Scenes } from 'telegraf';
import CostController from '../controllers/costController.js';
import * as scenes from './common/scenes.js';
import * as buttons from './common/buttons.js';

function printCostCard(ctx, cost) {
    ctx.reply(`(${cost.category.name}) ${cost.subject}: ${cost.amount}`, Markup.inlineKeyboard([
        buttons.edit(cost.id),
        buttons.del(cost.id),
    ]));
}

const lastCostsScene = new Scenes.BaseScene(scenes.LAST_COSTS);

lastCostsScene.enter(async (ctx) => {
    const lastNumber = /последни[е|й]\s*(\d*)/i.exec(ctx.message.text);

    let costs;
    if (lastNumber && !lastNumber[1]) {
        costs = await CostController.getTopN(1);
    } else if (lastNumber && lastNumber[1]) {
        costs = await CostController.getTopN(lastNumber[1]);
    }

    if (!costs) return ctx.scene.leave();

    costs.forEach((c) => {
        printCostCard(ctx, c);
    });
});

lastCostsScene.leave();

export default lastCostsScene;
