import './loadEnv.js'
import { Telegraf, Scenes, session } from 'telegraf';
import { telbitScenes } from './scenes/index.js';
import { ADD_CATEGORY, ADD_COST } from './scenes/common/scenes.js';
import * as db from './db.js';
import { CategoryController } from './controllers/categoryController.js';
import { CostController } from './controllers/costController.js';

db.start();

const bot = new Telegraf(process.env.TOKEN);
const stage = new Scenes.Stage(telbitScenes);
bot.use(session());
bot.use(stage.middleware());

bot.hears(/^\b[0-9\,\.]+\b$/i, (ctx) => {
    ctx.scene.enter(ADD_COST);
});

bot.hears(/покажи\s*расходы\s*(.*)?/i, async (ctx) => {
    const month = /покажи\s*расходы\s*(.*)?/i.exec(ctx.message.text);
    const costController = new CostController();

    let costs;
    if (month[1]) {
        costs = await costController.getByMonth(month);
    } else {
        costs = await costController.getTopN(5);
    }

    console.log();

    ctx.reply(costs.map(c => {
        return `(${c.category.name}) ${c.subject}: ${c.amount}`;
    }).join('\n'));
});

bot.hears(/категория/i, (ctx) => {
    ctx.scene.enter(ADD_CATEGORY);
});

bot.hears(/категории/i, async (ctx) => {
    const categoryController = new CategoryController();

    const categories = await categoryController.getAll();
    const count = categories.length;
    ctx.reply(`Сейчас количество категорий: ${count}`);
    ctx.reply(categories.map(c => {
        return c.name;
    }).join('\n'));
});

bot.launch();