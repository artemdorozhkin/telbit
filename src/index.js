import './loadEnv.js'
import { Telegraf, Scenes, session, Markup } from 'telegraf';
import { telbitScenes } from './scenes/index.js';
import * as scenes from './scenes/common/scenes.js';
import * as actions from './scenes/common/actions.js';
import * as db from './db.js';
import { CategoryController } from './controllers/categoryController.js';
import { CostController } from './controllers/costController.js';
import { Cost } from './scenes/addCost.js';
import * as buttons from './scenes/common/buttons.js';
import { costModelToObject } from './scenes/common/utils.js';

let idToDel = 0;
const accessDenied = 'Это частный бот, доступ извне запрещен.'

db.start();

const bot = new Telegraf(process.env.TOKEN);
const stage = new Scenes.Stage(telbitScenes);
bot.use(session());
bot.use(stage.middleware());

bot.hears(/^\b[0-9\,\.]+\b$/i, (ctx) => {
    if (!access(ctx)) return ctx.reply(accessDenied);

    ctx.scene.enter(scenes.ADD_COST);
});

bot.command('sumday', async (ctx) => {
    if (!access(ctx)) return

    const costController = new CostController();
    const sum = await costController.getTodaySum();
    ctx.reply(`Сумма за сегодня: ${sum}`);
})

bot.command('summonth', async (ctx) => {
    if (!access(ctx)) return

    const costController = new CostController();
    const sum = await costController.getMonthSum();
    ctx.reply(`Сумма за месяц: ${sum}`);
})

bot.hears(/последни[ей]\s*\d*/i, async (ctx) => {
    if (!access(ctx)) return

    ctx.scene.enter(scenes.LAST_COSTS);
});

bot.hears(/категория/i, (ctx) => {
    if (!access(ctx)) return

    ctx.scene.enter(scenes.ADD_CATEGORY);
});

bot.hears(/категории/i, async (ctx) => {
    if (!access(ctx)) return

    const categoryController = new CategoryController();

    const categories = await categoryController.getAll();
    const count = categories.length;
    ctx.reply(`Сейчас количество категорий: ${count}`);
    ctx.reply(categories.map(c => {
        return c.name;
    }).join('\n'));
});

bot.action(new RegExp(actions.EDIT), async (ctx) => {
    if (!access(ctx)) return

    const match = new RegExp(actions.EDIT + '(\\d+)').exec(ctx.callbackQuery.data);
    if (!match) {
        ctx.reply("Что-то пошло не так👀")
        return;
    }

    const costController = new CostController();
    const cost = await costController.getById(match[1]);

    if (!cost) {
        ctx.reply("Расход не существует или удален...");
        return;
    }

    costModelToObject(cost, Cost);
    return ctx.scene.enter(scenes.CHANGE_COST);
})

bot.action(new RegExp(actions.DEL), async (ctx) => {
    if (!access(ctx)) return

    const match = new RegExp(actions.DEL + '(\\d+)').exec(ctx.callbackQuery.data);
    if (!match) {
        ctx.reply("Что-то пошло не так👀")
        return;
    }

    idToDel = match[1];
    const costController = new CostController();
    const cost = await costController.getById(idToDel);

    if (!cost) {
        ctx.reply("Расход не существует или удален...");
        return;
    }

    costModelToObject(cost);
    ctx.replyWithHTML(`Вы уверены, что хотите удалить этот расход?\n<i>(${Cost.category}) ${Cost.subject}</i>`, Markup.inlineKeyboard([
        buttons.yes(),
        buttons.no(),
    ]))
})

bot.action(actions.YES, async (ctx) => {
    if (!access(ctx)) return

    const costController = new CostController();
    costController.delById(idToDel);
    ctx.replyWithHTML("Расход успешно удален!❌")
    return ctx.scene.leave();
})

bot.action(actions.NO, (ctx) => {
    if (!access(ctx)) return

    return ctx.scene.enter(scenes.CANCEL);
})


bot.launch();

function access(ctx) {
    const users = process.env.USERS.split(',');
    console.log(`${ctx.chat.id} стучится`);
    return users.includes(ctx.chat.id.toString());
}