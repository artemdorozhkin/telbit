import { Markup, Scenes } from 'telegraf';
import { CostController } from '../controllers/costController.js';
import * as scenes from './common/scenes.js';
import * as actions from './common/actions.js';
import * as buttons from './common/buttons.js'
import { Cost } from './addCost.js';

export const lastCostsScene = new Scenes.BaseScene(scenes.LAST_COSTS);
const costController = new CostController();

lastCostsScene.enter(async (ctx) => {
    const lastNumber = /последни[е|й]\s*(\d*)/i.exec(ctx.message.text);
    console.log(lastNumber);
    let costs;
    if (lastNumber && !lastNumber[1]) {
        costs = await costController.getTopN(1);
    }
    else if (lastNumber && lastNumber[1]) {
        costs = await costController.getTopN(lastNumber[1]);
    }

    if (!costs) return ctx.scene.leave();

    costs.forEach(c => {
        printCostCard(ctx, c)
    });
})

function printCostCard(ctx, cost) {
    ctx.reply(`(${cost.category.name}) ${cost.subject}: ${cost.amount}`, Markup.inlineKeyboard([
        buttons.edit(cost.id),
        buttons.del(cost.id),
    ]))
}

lastCostsScene.leave()