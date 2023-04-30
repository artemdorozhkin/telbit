import Telbit from './Telbit.js';
import ConfigService from './config/ConfigService.js';
import CommandsService from './commands/CommandsService.js';

const telbit = new Telbit(new ConfigService(), new CommandsService());
telbit.start();

// import { Telegraf, Scenes, session, Markup } from 'telegraf';

// import * as scenes from './common/scenes.js';
// import * as actions from './common/actions.js';

// import CostController from './controllers/costController.js';

// import { Cost } from './scenes/cost.scene.js';
// import * as buttons from './common/buttons.js';
// import costModelToObject from './common/utils.js';
// import CommandsService from './commands/CommandsService.js';

// let idToDel = 0;
// const accessDenied = 'Это частный бот, доступ извне запрещен.';

// bot.action(new RegExp(actions.EDIT), async (ctx) => {
//   if (!access(ctx)) return;

//   const match = new RegExp(`${actions.EDIT}(\\d+)`).exec(
//     ctx.callbackQuery.data
//   );
//   if (!match) {
//     ctx.reply('Что-то пошло не так👀');
//     return;
//   }

//   const cost = await CostController.getById(match[1]);

//   if (!cost) {
//     ctx.reply('Расход не существует или удален...');
//     return;
//   }

//   costModelToObject(cost, Cost);
//   return ctx.scene.enter(scenes.CHANGE_COST);
// });

// bot.action(new RegExp(actions.DEL), async (ctx) => {
//   if (!access(ctx)) return;

//   const match = new RegExp(`${actions.DEL}(\\d+)`).exec(ctx.callbackQuery.data);
//   if (!match) {
//     ctx.reply('Что-то пошло не так👀');
//     return;
//   }

//   [, idToDel] = match;
//   const cost = await CostController.getById(idToDel);

//   if (!cost) {
//     ctx.reply('Расход не существует или удален...');
//     return;
//   }

//   costModelToObject(cost);
//   ctx.replyWithHTML(
//     `Вы уверены, что хотите удалить этот расход?\n<i>(${Cost.category}) ${Cost.subject}</i>`,
//     Markup.inlineKeyboard([buttons.yes(), buttons.no()])
//   );
// });

// bot.action(actions.YES, async (ctx) => {
//   if (!access(ctx)) return;

//   await CostController.delById(idToDel);
//   ctx.replyWithHTML('Расход успешно удален!❌');
// });

// bot.action(actions.NO, (ctx) => {
//   if (!access(ctx)) return;
//   return ctx.scene.enter(scenes.CANCEL);
// });
