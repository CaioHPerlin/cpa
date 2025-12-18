import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./config/environment-variables";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.setGlobalPrefix("api");

  const port = app.get(ConfigService<EnvironmentVariables>).get("PORT");
  await app.listen(port);
}
bootstrap();
