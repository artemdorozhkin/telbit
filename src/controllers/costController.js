import { Op, Sequelize } from 'sequelize';
import moment from 'moment/moment.js';
import { Category, Cost } from '../models/models.js';
import { MONTH_NAMES } from '../common/constants.js';
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

  static async getTopN(number, category) {
    const costs = await Cost.findAll({
      limit: +number,
      order: [['id', 'DESC']],
      include: {
        model: Category,
        where: {
          name: {
            [Op.like]: `%${category}%`,
          },
        },
      },
    });
    return costs;
  }

  static async getTodaySum() {
    const sum = await Cost.findAll({
      attributes: [
        'subject',
        [Sequelize.fn('sum', Sequelize.col('amount')), 'total'],
      ],
      where: {
        createdAt: {
          [Op.gte]: moment().startOf('day').subtract(3, 'hours'), // отнимаем 3 часа, т.к. в БД -3
        },
      },
      group: ['subject'],
      raw: true,
    });

    return sum || 0;
  }

  static async getSumByCategoty(month) {
    const sum = await Cost.findAll({
      attributes: [
        'categoryId',
        [Sequelize.fn('sum', Sequelize.col('amount')), 'total'],
      ],
      where: {
        month,
      },
      group: ['categoryId'],
      include: Category,
      raw: true,
    });

    return sum || 0;
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

  static async getCategoryNameBy(subject) {
    const splitted = subject.split(' ');

    let elements = '';
    let foundCategory = '';
    for (let i = 0; i < splitted.length; i++) {
      const element = splitted[i];
      elements = [elements, element].join(' ').trim();
      const category = await Cost.findOne({
        where: {
          subject: {
            [Op.like]: `${elements}%`,
          },
        },
        order: [['id', 'DESC']],
        include: Category,
      });
      if (!category) {
        break;
      }

      foundCategory = category.category.name;
    }

    return foundCategory;
  }

  static async getCountCostsByCategory(name) {
    const categoryId = await CategoryController.getId(name);
    const costsCount = await Cost.count({ where: { categoryId } });
    return costsCount;
  }
}
