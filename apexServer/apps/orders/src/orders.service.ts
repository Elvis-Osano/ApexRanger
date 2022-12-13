import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { createReadStream } from "fs";
import { join } from "path";
import { lastValueFrom } from "rxjs";
import { BILLING_SERVICE } from "./constants/services";
import { CreateOrderRequest } from "./dto/create-order.request";
import { OrdersRepository } from "./orders.repository";

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit("order_created", {
          request,
          Authentication: authentication,
          orderNumber: (await this.ordersRepository.find({})).length,
        })
      );

      await session.commitTransaction();

      return {
        ...order,
        orderNumber: (await this.ordersRepository.find({})).length,
      };
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
