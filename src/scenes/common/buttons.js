import { MONTH_NAMES, firstMonths, secondMonths, thirdMonths } from './constants.js'
import * as actions from './actions.js';
import { Markup } from 'telegraf';
import { CategoryController } from '../../controllers/categoryController.js';

export function months() {
    let buttons = [];
    let buffer = [];
    for (let monthName of MONTH_NAMES) {
        buffer.push(Markup.button.callback(monthName, monthName));
        if (buffer.length == 4) {
            buttons.push(buffer.slice());
            buffer = [];
        }
    }
    if (buffer.length > 0) buttons.push(buffer.slice());

    return buttons;
}

export async function categories() {
    const categoryController = new CategoryController();
    const categories = await categoryController.getAll();

    let buttons = [];
    let buffer = [];
    for (let category of categories) {
        const name = category.name;
        buffer.push(Markup.button.callback(name, actions.CATEGORY + name));
        if (buffer.length == 3) {
            buttons.push(buffer.slice());
            buffer = [];
        }
    }
    if (buffer.length > 0) buttons.push(buffer.slice());

    return buttons;
}

export function yes() { return Markup.button.callback('Да', actions.YES); }

export function no() { return Markup.button.callback('Нет', actions.NO); }

export function cancel() { return [Markup.button.callback('Отменить', actions.CANCEL)]; }

export function newCategory() { return [Markup.button.callback('Добавить категорию...', actions.ADD_CATEGORY)]; }

export function edit(id) { return Markup.button.callback('Редактировать', actions.EDIT + id); }

export function del(id) { return Markup.button.callback('Удалить', actions.DEL + id); }
