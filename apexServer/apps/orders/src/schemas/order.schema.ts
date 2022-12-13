import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common";
import { order } from "../dto/create-order.request";

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  table: number;
  @Prop()
  orders: order[];

  @Prop()
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
