import { Markup, Scenes } from 'telegraf';
import isNumber from 'is-number';
import * as buttons from '../common/buttons.js';

import { Cost } from './cost.scene.js';

import * as scenes from '../common/scenes.js';
import * as actions from '../common/actions.js';
import { MONTHS_PATTERN } from '../common/constants.js';

export const changeCostScene = new Scenes.BaseScene(scenes.CHANGE_COST);

changeCostScene.enter((ctx) => {
  ctx.editMessageText(
    'Что изменить?',
    Markup.inlineKeyboard([
      [
        Markup.button.callback('Сумма', actions.CHANGE_AMOUNT),
        Markup.button.callback('Товар/услугу', actions.CHANGE_SUBJECT),
        Markup.button.callback('Категорию', actions.CHANGE_CATEGORY),
        Markup.button.callback('Месяц', actions.CHANGE_MONTH),
      ],
      buttons.cancel(),
    ])
  );
});

changeCostScene.action(actions.CANCEL, (ctx) => ctx.scene.enter(scenes.CANCEL));

changeCostScene.action(actions.CHANGE_AMOUNT, (ctx) =>
  ctx.scene.enter(scenes.CHANGE_AMOUNT)
);

changeCostScene.action(actions.CHANGE_SUBJECT, (ctx) =>
  ctx.scene.enter(scenes.CHANGE_SUBJECT)
);

changeCostScene.action(actions.CHANGE_CATEGORY, (ctx) =>
  ctx.scene.enter(scenes.CHANGE_CATEGORY)
);

changeCostScene.action(actions.CHANGE_MONTH, (ctx) =>
  ctx.scene.enter(scenes.CHANGE_MONTH)
);

// CHANGE AMOUNT
export const changeAmountScene = new Scenes.BaseScene(scenes.CHANGE_AMOUNT);

changeAmountScene.enter((ctx) => {
  ctx.reply('Введите сумму цифрами', Markup.inlineKeyboard(buttons.cancel()));
});

changeAmountScene.on('text', (ctx) => {
  const response = ctx.message.text.replace(',', '.').trim();

  if (!isNumber(response)) {
    return ctx.scene.enter(scenes.CHANGE_AMOUNT);
  }

  Cost.amount = +response;
  return ctx.scene.enter(scenes.CONFIRM);
});

changeAmountScene.action(actions.CANCEL, (ctx) =>
  ctx.scene.enter(scenes.CANCEL)
);

// CHANGE SUBJECT
export const changeSubjectScene = new Scenes.BaseScene(scenes.CHANGE_SUBJECT);

changeSubjectScene.enter((ctx) => {
  ctx.editMessageText('Что оплатили?', Markup.inlineKeyboard(buttons.cancel()));
});

changeSubjectScene.on('text', (ctx) => {
  Cost.subject = ctx.message.text;
  return ctx.scene.enter(scenes.CONFIRM);
});

changeSubjectScene.action(actions.CANCEL, (ctx) =>
  ctx.scene.enter(scenes.CANCEL)
);

// CHANGE CATEGORY
export const changeCategoryScene = new Scenes.BaseScene(scenes.CHANGE_CATEGORY);

changeCategoryScene.enter(async (ctx) => {
  const categories = [];
  categories.push(...(await buttons.categories()));
  categories.push(buttons.newCategory());
  categories.push(buttons.cancel());

  ctx.editMessageText(
    'Выберите категорию расхода',
    Markup.inlineKeyboard(categories)
  );
});

changeCategoryScene.action(actions.ADD_CATEGORY, (ctx) =>
  ctx.scene.enter(scenes.ADD_CATEGORY)
);

changeCategoryScene.action(new RegExp(actions.CATEGORY), (ctx) => {
  Cost.category = ctx.callbackQuery.data.replace(actions.CATEGORY, '');
  return ctx.scene.enter(scenes.CONFIRM);
});

changeCategoryScene.action(actions.CANCEL, (ctx) =>
  ctx.scene.enter(scenes.CANCEL)
);

// CHANGE MONTH
export const changeMonthScene = new Scenes.BaseScene(scenes.CHANGE_MONTH);

changeMonthScene.enter((ctx) => {
  const months = buttons.months();
  months.push(buttons.cancel());
  ctx.editMessageText('Выберите месяц расхода', Markup.inlineKeyboard(months));
});

changeMonthScene.action(MONTHS_PATTERN, (ctx) => {
  Cost.month = ctx.callbackQuery.data;
  return ctx.scene.enter(scenes.CONFIRM);
});

changeMonthScene.action(actions.CANCEL, (ctx) =>
  ctx.scene.enter(scenes.CANCEL)
);
