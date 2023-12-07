import { DataTypes } from 'sequelize';
import DBService from '../dbService.js';
import ConfigService from '../common/config/configService.js';

const db = new DBService(new ConfigService(), 'mysql');
db.start();

const Category = db.sequelize.define('category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Cost = db.sequelize.define('cost', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subject: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  month: { type: DataTypes.STRING, allowNull: false },
});

Category.hasOne(Cost);
Cost.belongsTo(Category);

export { Category, Cost };
