import AddCategoryScene from '../scenes/addCategory.scene.js';

export default class AddCategoryCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/категория/i, (ctx) => {
      new AddCategoryScene().start(ctx);
    });
  }
}
