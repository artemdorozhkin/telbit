import { Op, Sequelize } from 'sequelize';
import moment from 'moment/moment.js';
import { Category, Cost } from '../models/models.js';
import { MONTH_NAMES } from '../scenes/common/constants.js';
import CategoryController from './categoryController.js';

export default class CostController {
  static async create(cost) {
    const categoryId = await CategoryController.getId(cost.category);

    await Cost.create({
      subject: cost.subject,
      amount: cost.amount.toFixed(2),
      month: cost.month,
      categoryId,
    });
  }

  static async update(cost) {
    const categoryId = await CategoryController.getId(cost.category);
    await Cost.update(
      {
        categoryId,
        subject: cost.subject,
        month: cost.month,
        amount: cost.amount,
      },
      {
        where: { id: cost.id },
      }
    );
  }

  static async getTopN(number) {
    const costs = await Cost.findAll({
      limit: +number,
      order: [['id', 'DESC']],
      include: Category,
    });
    return costs;
  }

  static async getTodaySum() {
    const sum = await Cost.findAll({
      attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
      where: {
        createdAt: {
          [Op.gte]: moment().startOf('day'),
        },
      },
      raw: true,
    });

    return sum.at(0).total || 0;
  }

  static async getMonthSum() {
    const curMonth = MONTH_NAMES[moment().month()];

    const sum = await Cost.findAll({
      attributes: [[Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
      where: {
        month: curMonth,
      },
      raw: true,
    });

    return sum.at(0).total || 0;
  }

  static async getById(id) {
    const cost = await Cost.findOne({ where: { id }, include: Category });
    return cost;
  }

  static async delById(id) {
    await Cost.destroy({ where: { id } });
  }
}
