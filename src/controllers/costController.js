import { Op, Sequelize } from "sequelize";
import { Category, Cost } from "../models/models.js"
import { CategoryController } from "./categoryController.js";
import moment from "moment/moment.js";
import { MONTH_NAMES } from "../scenes/common/constants.js";

const categoryController = new CategoryController();

export class CostController {
    async create(cost) {
        const categoryId = await categoryController.getId(cost.category);

        await Cost.create({
            subject: cost.subject,
            amount: cost.amount.toFixed(2),
            month: cost.month,
            categoryId: categoryId,
        });
    }

    async update(cost) {
        const categoryId = await categoryController.getId(cost.category);
        await Cost.update(
            {
                categoryId, subject: cost.subject, month: cost.month, amount: cost.amount
            },
            {
                where: { id: cost.id }
            })
    }

    async getTopN(number) {
        const costs = await Cost.findAll({ limit: +number, order: [['id', 'DESC']], include: Category });
        return costs;
    }

    async getTodaySum() {
        const sum = await Cost.findAll(
            {
                attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
                where: {
                    createdAt: {
                        [Op.gte]: moment().startOf('day'),
                    }
                },
                raw: true,
            });

        return sum.at(0).total;
    }

    async getMonthSum() {
        const curMonth = MONTH_NAMES[moment().month()];

        const sum = await Cost.findAll(
            {
                attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
                where: {
                    month: curMonth,
                },
                raw: true,
            });

        return sum.at(0).total;
    }

    async getById(id) {
        const cost = await Cost.findOne({ where: { id }, include: Category });
        return cost;
    }

    async delById(id) {
        await Cost.destroy({ where: { id } });
    }
}