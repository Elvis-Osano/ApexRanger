import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
export const joiValidation: ConfigModuleOptions = {
  validationSchema: Joi.object({
    DB_URL: Joi.string().required(),
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    DB_TYPE: Joi.string().valid('mysql', 'postgresql').default('mysql'),
    DB_SYNCHRONIZE: Joi.boolean(),
    DB_MIGRATE: Joi.boolean(),
    DB_TIMEOUT: Joi.number(),
    DB_LOGGING: Joi.boolean(),
    DB_SSL: Joi.boolean(),
  }),
};
