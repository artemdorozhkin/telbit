import cancelScene from './cancel.js';
import confirmCostScene from './confirmCost.js';
import addCategoryScene from './addCategory.js';
import { addCost } from './cost.scene.js';
import {
  changeAmountScene,
  changeCategoryScene,
  changeCostScene,
  changeMonthScene,
  changeSubjectScene,
} from './changeCost.js';
import lastCostsScene from './lastCosts.js';

const telbitScenes = [
  addCategoryScene,
  addCost,
  changeCostScene,
  changeAmountScene,
  changeSubjectScene,
  changeCategoryScene,
  changeMonthScene,
  lastCostsScene,
  confirmCostScene,
  cancelScene,
];

export default telbitScenes;
