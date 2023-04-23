import { Category } from "../models/models.js"

export class CategoryController {
    async create(name) {
        const category = await Category.create({ name });
    }

    async getId(name) {
        const category = await Category.findOne(
            {
                where: { name }
            }
        );

        console.log(category);
        return category.dataValues.id;
    }

    async getAll() {
        return await Category.findAll();
    }
}