import CostDTO from '../models/dto/cost.dto.js';
import ConfigService from './config/configService.js';

export default function costModelToObject(cost) {
  CostDTO.id = cost.id;
  CostDTO.category = cost.category.name;
  CostDTO.subject = cost.subject;
  CostDTO.month = cost.month;
  CostDTO.amount = cost.amount;

  return CostDTO;
}

export function hasAccess(ctx) {
  const users = new ConfigService().get('USERS').split(',');
  return users.includes(ctx.chat.id.toString());
}
