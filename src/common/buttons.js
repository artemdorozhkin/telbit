import { Markup } from 'telegraf';
import { MONTH_NAMES } from './constants.js';
import * as actions from './actions.js';
import * as buttons from './buttons.js';
import CategoryController from '../controllers/categoryController.js';
import CostController from '../controllers/costController.js';

export function lastCosts(costId) {
  return Markup.inlineKeyboard([buttons.edit(costId), buttons.del(costId)]);
}

export function months() {
  const buttons = [];
  const columns = 4;

  let start = 0;
  while (start < MONTH_NAMES.length) {
    const end = start + columns;
    buttons.push(
      MONTH_NAMES.slice(start, end).map((monthName) =>
        Markup.button.callback(monthName, monthName)
      )
    );
    start = end;
  }

  return buttons;
}

export async function categories(columnsCount, withCosts) {
  let categoryNames = await CategoryController.getAll();
  if (withCosts) {
    categoryNames = await getCountCosts(categoryNames);
  }

  const buttons = [];
  const columns = columnsCount || 3;
  let start = 0;
  while (start < categoryNames.length) {
    const end = start + columns;
    buttons.push(
      categoryNames
        .slice(start, end)
        .map(({ name }) =>
          Markup.button.callback(name, actions.CATEGORY + name)
        )
    );
    start = end;
  }

  return buttons;
}

async function getCountCosts(categoryNames) {
  const costsCount = [];
  for (let i = 0; i < categoryNames.length; i++) {
    const name = categoryNames[i].name;
    const count = await CostController.getCountCostsByCategory(name);
    costsCount.push({ name: `${name} ${count}` });
  }

  return costsCount;
}

export function yes() {
  return Markup.button.callback('Да', actions.YES);
}

export function no() {
  return Markup.button.callback('Нет', actions.NO);
}

export function cancel() {
  return [Markup.button.callback('Отменить', actions.CANCEL)];
}

export function newCategory() {
  return [
    Markup.button.callback('Добавить категорию...', actions.ADD_CATEGORY),
  ];
}

export function edit(id) {
  return Markup.button.callback('Редактировать', actions.EDIT + id);
}

export function del(id) {
  return Markup.button.callback('Удалить', actions.DEL + id);
}

export function editCost() {
  return [
    Markup.button.callback('Сумма', actions.CHANGE_AMOUNT),
    Markup.button.callback('Товар/услугу', actions.CHANGE_SUBJECT),
    Markup.button.callback('Категорию', actions.CHANGE_CATEGORY),
    Markup.button.callback('Месяц', actions.CHANGE_MONTH),
  ];
}
