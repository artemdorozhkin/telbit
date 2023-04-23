import { firstMonths, secondMonths, thirdMonths } from './constants.js'
import * as actions from './actions.js';
import { Markup } from 'telegraf';
import { CategoryController } from '../../controllers/categoryController.js';

export function months() {
    const monthButtons = [];

    monthButtons.push(firstMonths.map(monthName => {
        return Markup.button.callback(monthName, monthName)
    }));
    monthButtons.push(secondMonths.map(monthName => {
        return Markup.button.callback(monthName, monthName)
    }));
    monthButtons.push(thirdMonths.map(monthName => {
        return Markup.button.callback(monthName, monthName)
    }));

    return monthButtons;
}

export async function categories() {
    const categoryController = new CategoryController();
    const categories = await categoryController.getAll();

    let buttons = [];
    let buffer = [];
    for (let category of categories) {
        if (buffer.length == 4) buffer = [];
        const name = category.name;
        buffer.push(Markup.button.callback(name, actions.CATEGORY + name));
        if (buffer.length == 4) buttons.push(buffer.slice());
    }
    buttons.push(buffer.slice());

    return buttons;
}

export function yes() { return Markup.button.callback('Да', actions.YES); }

export function no() { return Markup.button.callback('Нет', actions.NO); }

export function cancel() { return [Markup.button.callback('Отменить', actions.CANCEL)]; }

export function newCategory() { return [Markup.button.callback('Добавить категорию...', actions.ADD_CATEGORY)]; }
