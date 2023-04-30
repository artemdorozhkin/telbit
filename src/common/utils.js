import CostDTO from './../models/dto/Cost.dto.js';

export default function costModelToObject(cost) {
  CostDTO.id = cost.id;
  CostDTO.category = cost.category.name;
  CostDTO.subject = cost.subject;
  CostDTO.month = cost.month;
  CostDTO.amount = cost.amount;

  return CostDTO;
}
