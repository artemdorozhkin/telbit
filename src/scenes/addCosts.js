import { Markup, Scenes } from "telegraf";
import * as buttons from "./common/buttons.js";

import { MONTHS_PATTERN } from "./common/constants.js";
import * as actions from "./common/actions.js";
import * as scenes from "./common/scenes.js";


export const Cost = {
    category: '',
    subject: '',
    amount: 0,
    month: '',
};

export const addCostsScene = new Scenes.BaseScene(scenes.ADD_COST);

addCostsScene.enter((ctx) => {
    Cost.amount = ctx.message.text.replace(',', '.').trim();
    ctx.reply('Что оплатили?', Markup.inlineKeyboard(buttons.cancel()));
});

addCostsScene.on('text', async (ctx) => {
    Cost.subject = ctx.message.text;

    const categories = [];
    categories.push(...await buttons.categories());
    categories.push(buttons.newCategory());
    categories.push(buttons.cancel());

    ctx.reply('Выберите категорию расхода', Markup.inlineKeyboard(categories));
});

addCostsScene.action(new RegExp("^" + actions.CATEGORY), (ctx) => {
    Cost.category = ctx.callbackQuery.data.replace(actions.CATEGORY, '');

    const months = buttons.months();
    months.push(buttons.cancel());
    ctx.editMessageText('Выберите месяц расхода', Markup.inlineKeyboard(months))
});

addCostsScene.action(MONTHS_PATTERN, (ctx) => {
    Cost.month = ctx.callbackQuery.data;
    return ctx.scene.enter(scenes.CONFIRM)
});

addCostsScene.action(actions.ADD_CATEGORY, (ctx) => {
    return ctx.scene.enter(scenes.ADD_CATEGORY);
});

addCostsScene.action(actions.CANCEL, (ctx) => {
    return ctx.scene.enter(scenes.CANCEL);
});

addCostsScene.use((ctx) => {
    ctx.reply('Выберите действие, или нажмите кнопку Отмена', Markup.inlineKeyboard(buttons.cancel()));
});