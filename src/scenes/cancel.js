import { Scenes } from "telegraf";
import { CANCEL } from "./common/scenes.js";

export const cancelScene = new Scenes.BaseScene(CANCEL);

cancelScene.enter((ctx) => {
    ctx.editMessageText('Хорошо, жду указаний 😊');
    return ctx.scene.leave();
})