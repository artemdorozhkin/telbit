import { Markup } from 'telegraf';
import * as buttons from './buttons.js';

export function months() {
  const monthsButtons = buttons.months();
  monthsButtons.push(buttons.cancel());

  return Markup.inlineKeyboard(monthsButtons);
}

export async function categories(columns, withCosts) {
  const columnsCount = columns || 3;
  const categoriesButtons = [];
  categoriesButtons.push(
    ...(await buttons.categories(columnsCount, withCosts))
  );
  categoriesButtons.push(buttons.newCategory());
  categoriesButtons.push(buttons.cancel());

  return Markup.inlineKeyboard(categoriesButtons);
}

export function cancel() {
  return Markup.inlineKeyboard(buttons.cancel());
}

export function yesNoCancel() {
  const yesNoCancel = [];
  yesNoCancel.push(buttons.yes(), buttons.no());
  return Markup.inlineKeyboard(yesNoCancel, buttons.cancel());
}

export function costCard(costId) {
  return Markup.inlineKeyboard([buttons.edit(costId), buttons.del(costId)]);
}

export function editCost() {
  return Markup.inlineKeyboard([buttons.editCost(), buttons.cancel()]);
}
