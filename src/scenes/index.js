import AddCostScene from './addCost.scene.js';
import EditCostScene from './editCost.scene.js';
import ConfirmCostScene from './confirmCost.scene.js';
import EditAmountScene from './editAmount.scene.js';
import EditCategoryScene from './editCategory.scene.js';
import EditMonthScene from './editMonth.scene.js';
import EditSubjectScene from './editSubject.scene.js';
import CancelScene from './cancel.scene.js';
import LastCostsScene from './lastCosts.scene.js';
import AddCategoryScene from './addCategory.scene.js';
import DelCategoryScene from './delCategory.scene.js';

const telbitScenes = [
  new AddCostScene().get(),
  new EditCostScene().get(),
  new EditAmountScene().get(),
  new EditCategoryScene().get(),
  new EditMonthScene().get(),
  new EditSubjectScene().get(),
  new AddCategoryScene().get(),
  new LastCostsScene().get(),
  new ConfirmCostScene().get(),
  new CancelScene().get(),
  new DelCategoryScene().get(),
];

export default telbitScenes;
