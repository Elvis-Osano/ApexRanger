import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createReadStream } from "fs";
import { join } from "path";
import { lastValueFrom } from "rxjs";
import { Connection } from "typeorm";
import { BILLING_SERVICE } from "./constants/services";
import { CreateOrderRequest } from "./dto/create-order.request";
import Order from "./entities/order.schema";

@Injectable()
export class OrdersService {
  constructor(
    private readonly connection: Connection,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = queryRunner.manager.create(Order, request);

      this.billingClient.emit("order_created", {
        request,
        Authentication: authentication,
        orderNumber: (await queryRunner.manager.find(Order)).length,
      });
      const res = await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();

      return {
        success: true,
        res,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        state: "Rolling Back Database",
        error: `Transaction failed with err :- ${err}`,
      };
    } finally {
      //release query runner
      await queryRunner.release();
    }
  }
}
