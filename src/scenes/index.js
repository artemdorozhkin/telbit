import { cancelScene } from "./cancel.js";
import { confirmCostScene } from './confirmCost.js'
import { addCategoryScene } from "./addCategory.js";
import { addCostScene } from "./addCost.js";
import {
    changeAmountScene,
    changeCategoryScene,
    changeCostScene,
    changeMonthScene,
    changeSubjectScene
} from "./changeCost.js";
import { lastCostsScene } from "./lastCosts.js";

export const telbitScenes = [
    addCategoryScene,
    addCostScene,
    changeCostScene,
    changeAmountScene,
    changeSubjectScene,
    changeCategoryScene,
    changeMonthScene,
    lastCostsScene,
    confirmCostScene,
    cancelScene
];