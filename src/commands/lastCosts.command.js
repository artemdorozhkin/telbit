import { hasAccess } from '../common/utils.js';
import { accessDeniedMsg } from '../common/constants.js';
import LastCostsScene from '../scenes/lastCosts.scene.js';
import log from '../common/logging.js';

export default class LastCostsCommand {
  bot;

  constructor(bot) {
    this.bot = bot;
  }

  handle() {
    this.bot.hears(/последни[ей]\s*\d*/i, async (ctx) => {
      log.info(`${ctx.from.first_name} смотрит последний расход`);
      if (!hasAccess(ctx)) {
        return ctx.reply(accessDeniedMsg);
      }
      new LastCostsScene().start(ctx);
    });
  }
}
