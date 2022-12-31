import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { order } from "../dto/create-order.request";

@Entity({ name: "orders" })
export default class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  table: number;
  @Column({
    type: "simple-array",
  })
  orders: order[];

  @Column({
    type: "float",
  })
  total: number;
}
