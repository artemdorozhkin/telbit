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
  new AddCostScene().create(),
  new EditCostScene().create(),
  new EditAmountScene().create(),
  new EditCategoryScene().create(),
  new EditMonthScene().create(),
  new EditSubjectScene().create(),
  new AddCategoryScene().create(),
  new LastCostsScene().create(),
  new ConfirmCostScene().create(),
  new CancelScene().create(),
  new DelCategoryScene().create(),
];

export default telbitScenes;
