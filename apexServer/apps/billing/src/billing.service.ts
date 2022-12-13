import { Injectable, Logger, StreamableFile } from "@nestjs/common";
import { CreateOrderRequest } from "apps/orders/src/dto/create-order.request";
import { createReadStream } from "fs";
import { join } from "path";
import niceInvoice from "./billing.utility";
@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  bill(data: { request: CreateOrderRequest; orderNumber: number; user: any }) {
    const { request, user, orderNumber } = data;

    const invoiceDetail = {
      service: {
        server: (user.name as string).toUpperCase(),
        table: request.table,
      },
      items: request.orders,
      subtotal: request.total,
      total: request.total,
      order_number: orderNumber,
      header: {
        company_name: "Apex Ranger",
        company_logo: "logo.png",
        company_address:
          "Apex Ranger. 123 Kimathi Street 1th Floor Utalii House, Nairobi 123456",
      },
      footer: {
        text: "Thank you for dining with us!!Welcome Again.",
      },
      currency_symbol: "Kshs ",
      date: {
        billing_date: new Date().toLocaleDateString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      },
    };

    niceInvoice(invoiceDetail, "./invoices/your-invoice-name.pdf");
    this.logger.verbose("Billing...success");
  }
}
