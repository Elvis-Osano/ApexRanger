import {
  Body,
  Controller,
  Get,
  Response,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { RmqService, JwtAuthGuard } from "@app/common";
import { BillingService } from "./billing.service";
import { createReadStream } from "fs";
import { join } from "path";
import niceInvoice from "./billing.utility";
import { CreateOrderRequest } from "apps/orders/src/dto/create-order.request";
@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService
  ) {}

  @Get("bill")
  async getBill(@Response({ passthrough: true }) res, @Body() data) {
    const file = createReadStream(
      join(process.cwd(), "./invoices/your-invoice-name.pdf")
    );

    await res.set({
      "Content-Type": "application/pdf",
      // 'Content-Disposition': `inline; filename=invoiceOrder${number}.pdf`
      "Content-Disposition": `inline; filename=invoiceOrder.pdf`,
    });

    return new StreamableFile(file);
  }
  @EventPattern("order_created")
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(
    @Payload()
    data: {
      request: CreateOrderRequest;
      orderNumber: number;
      user: any;
    },
    @Ctx() context: RmqContext
  ) {
    this.rmqService.ack(context);
    await this.billingService.bill(data);
  }
}
