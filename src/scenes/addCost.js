import { Markup, Scenes } from "telegraf";
import * as buttons from "./common/buttons.js";

import { MONTHS_PATTERN } from "./common/constants.js";
import * as actions from "./common/actions.js";
import * as scenes from "./common/scenes.js";


export const Cost = {
    id: 0,
    category: '',
    subject: '',
    amount: 0,
    month: '',
};

export const addCostScene = new Scenes.BaseScene(scenes.ADD_COST);

addCostScene.enter((ctx) => {
    Cost.id = 0;
    Cost.amount = +ctx.message.text.replace(',', '.').trim();
    ctx.reply('Что оплатили?', Markup.inlineKeyboard(buttons.cancel()));
});

addCostScene.on('text', async (ctx) => {
    Cost.subject = ctx.message.text;

    const categories = [];
    categories.push(...await buttons.categories());
    categories.push(buttons.newCategory());
    categories.push(buttons.cancel());

    ctx.reply('Выберите категорию расхода', Markup.inlineKeyboard(categories));
});

addCostScene.action(new RegExp("^" + actions.CATEGORY), (ctx) => {
    Cost.category = ctx.callbackQuery.data.replace(actions.CATEGORY, '');

    const months = buttons.months();
    months.push(buttons.cancel());
    ctx.editMessageText('Выберите месяц расхода', Markup.inlineKeyboard(months))
});

addCostScene.action(MONTHS_PATTERN, (ctx) => {
    Cost.month = ctx.callbackQuery.data;
    return ctx.scene.enter(scenes.CONFIRM)
});

addCostScene.action(actions.ADD_CATEGORY, (ctx) => {
    return ctx.scene.enter(scenes.ADD_CATEGORY);
});

addCostScene.action(actions.CANCEL, (ctx) => {
    return ctx.scene.enter(scenes.CANCEL);
});

addCostScene.use((ctx) => {
    ctx.reply('Выберите действие, или нажмите кнопку Отмена', Markup.inlineKeyboard(buttons.cancel()));
});