import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "apps/auth/src/users/entities/user.entity";

import Order from "apps/orders/src/entities/order.schema";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>("DB_URL"),
        entities: [Order, User],
        synchronize: process.env.NODE_ENV === "development" ? true : false,
        migrationsRun: true, // Will run migrations every time the app starts
        migrations: ["dist/database/migrations/*.js"], // Links to the migrations (in /dist because: after build)
        ...(configService.get<boolean>("DB_SSL")
          ? {
              ssl: true,
              extra: {
                ssl: {
                  rejectUnauthorized: false,
                },
              },
            }
          : {}),
      }),
    }),
  ],
})
export class DatabaseModule {}
