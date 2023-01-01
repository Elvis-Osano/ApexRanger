import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { OrdersModule } from "./orders.module";

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: [
      "http://localhost:3002",
      "http://localhost:3005",
      "http://localhost",
      "http://ec2-100-27-28-26.compute-1.amazonaws.com",
      "http://100.27.28.26",
    ],
    credentials: true,
  });
  await app.listen(configService.get("PORT"));
}
bootstrap();
