import { Markup } from 'telegraf';
import { MONTH_NAMES } from './constants.js';
import * as actions from './actions.js';
import CategoryController from '../../controllers/categoryController.js';

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

export async function categories() {
  const categoryNames = await CategoryController.getAll();

  const buttons = [];
  const columns = 3;
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
