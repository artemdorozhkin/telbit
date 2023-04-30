import AddCostCommand from './addCost.command.js';
import LastCostsCommand from './lastCosts.command.js';
import SumCostsCommand from './sumCosts.command.js';
import AddCategoryCommand from './addCategoty.command.js';
import PrintCategoriesCommand from './printCategories.command.js';
import EditCostCommand from './editCost.command.js';
import DeleteCostCommand from './delCost.command.js';

export default class CommandsService {
  get(bot) {
    const commandList = [
      new AddCostCommand(bot),
      new LastCostsCommand(bot),
      new SumCostsCommand(bot),
      new AddCategoryCommand(bot),
      new PrintCategoriesCommand(bot),
      new EditCostCommand(bot),
      new DeleteCostCommand(bot),
    ];

    return commandList;
  }
}
