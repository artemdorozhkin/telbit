import { Cost } from "../addCost.js";

export function costModelToObject(cost) {
    Cost.id = cost.id;
    Cost.category = cost.category.name;
    Cost.subject = cost.subject;
    Cost.month = cost.month;
    Cost.amount = cost.amount;
}
