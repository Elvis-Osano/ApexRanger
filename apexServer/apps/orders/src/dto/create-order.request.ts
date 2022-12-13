import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from "class-validator";
export interface order {
  id: number;
  name: string;
  quantity: number;
  itemTotal: number;
}
export class CreateOrderRequest {
  table: number;

  orders: order[];

  total: number;
}
