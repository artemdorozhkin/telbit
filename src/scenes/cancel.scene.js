import { Scenes } from 'telegraf';

export default class CancelScene {
  sceneID;
  scene;

  constructor() {
    this.sceneID = 'CANCEL';
  }

  start(ctx) {
    return ctx.scene.enter(this.sceneID);
  }

  create() {
    this.scene = new Scenes.BaseScene(this.sceneID);

    this.scene.enter((ctx) => {
      ctx.editMessageText('Хорошо, жду указаний 😊');
      return ctx.scene.leave();
    });

    return this.scene;
  }
}
