import { Category, Cost } from "../models/models.js"
import { CategoryController } from "./categoryController.js";

export class CostController {
    async create(cost) {
        const categoryController = new CategoryController();
        const categoryId = await categoryController.getId(cost.category);

        const newCost = await Cost.create({
            subject: cost.subject,
            amount: cost.amount,
            month: cost.month,
            categoryId: categoryId,
        });
    }

    async getTopN(number = 3) {
        const costs = await Cost.findAll({ limit: number, include: Category });
        return costs;
    }
}