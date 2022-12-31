import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";
import { RmqModule, AuthModule } from "@app/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

import { BILLING_SERVICE } from "./constants/services";
import { DatabaseModule, joiValidation } from "@app/common/database/src";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...joiValidation,
      envFilePath: "./apps/orders/.env",
    }),
    DatabaseModule,

    RmqModule.register({
      name: BILLING_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
