import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const Cost = sequelize.define('cost', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    subject: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    month: { type: DataTypes.STRING, allowNull: false },
});

Category.hasOne(Cost);
Cost.belongsTo(Category);