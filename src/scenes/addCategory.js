import { Markup, Scenes } from "telegraf";
import * as scenes from "./common/scenes.js";
import * as actions from "./common/actions.js";
import { cancel } from "./common/buttons.js";
import { CategoryController } from "../controllers/categoryController.js";

export const addCategoryScene = new Scenes.BaseScene(scenes.ADD_CATEGORY);

addCategoryScene.enter((ctx) => {
    ctx.reply('Напишите название новой категории', Markup.inlineKeyboard(cancel()));
})

addCategoryScene.on('text', async (ctx) => {
    const category = ctx.message.text;
    const categoryController = new CategoryController();
    await categoryController.create(category);
    const id = await categoryController.getId(category);
    console.log(id);

    ctx.reply(`Добавлена категория: ${id} ${category}`)
    return ctx.scene.leave();
})

addCategoryScene.action(actions.CANCEL, (ctx) => {
    return ctx.scene.enter(scenes.CANCEL);
})

addCategoryScene.leave()