import Cost from './cost.command.js';
import LastCosts from './lastCosts.command.js';
import SumCosts from './sumCosts.command.js';
import Category from './categoty.command.js';
import Categories from './categories.command.js';

export default class CommandsService {
  get(bot) {
    const commandList = [
      new Cost(bot),
      new LastCosts(bot),
      new SumCosts(bot),
      new Category(bot),
      new Categories(bot),
    ];

    return commandList;
  }
}
