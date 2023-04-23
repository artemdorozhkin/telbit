import { cancelScene } from "./cancel.js";
import { confirmCostScene } from './confirmCost.js'
import { addCategoryScene } from "./addCategory.js";
import { addCostsScene } from "./addCosts.js";
import {
    changeAmountScene,
    changeCategoryScene,
    changeCostScene,
    changeMonthScene,
    changeSubjectScene
} from "./changeCost.js";

export const telbitScenes = [
    addCategoryScene,
    addCostsScene,
    changeCostScene,
    changeAmountScene,
    changeSubjectScene,
    changeCategoryScene,
    changeMonthScene,
    confirmCostScene,
    cancelScene
];