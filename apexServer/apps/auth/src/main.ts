import { NestFactory } from "@nestjs/core";
import { RmqService } from "@app/common";
import { AuthModule } from "./auth.module";
import { RmqOptions } from "@nestjs/microservices";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions("AUTH", true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
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
