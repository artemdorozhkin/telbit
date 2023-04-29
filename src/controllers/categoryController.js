import { Category } from '../models/models.js';

export default class CategoryController {
  static async create(name) {
    await Category.create({ name });
  }

  static async getId(name) {
    const category = await Category.findOne({
      where: { name },
    });

    return category.dataValues.id;
  }

  static async getAll() {
    const categories = await Category.findAll();
    return categories;
  }
}
