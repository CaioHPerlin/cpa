import { plainToInstance } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, validateSync } from "class-validator";

enum NodeEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export class EnvironmentVariables {
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number;

  @IsOptional()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv = NodeEnv.DEVELOPMENT;

  @IsString()
  DATABASE_URL: string;
}

export function validateEnvironmentVariables(config: Record<string, any>): EnvironmentVariables {
  const transformed = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    exposeDefaultValues: true,
  });

  const validationErrors = validateSync(transformed, {
    skipMissingProperties: false,
    whitelist: true,
  });

  if (validationErrors.length > 0) {
    throw new Error(`Environment variables validation failed: ${validationErrors.toString()}`);
  }

  return transformed;
}
