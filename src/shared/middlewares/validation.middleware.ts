import { type ClassConstructor, plainToInstance } from "class-transformer";
import { type ValidatorOptions, validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

type RequestTarget = "body" | "query" | "params";

interface ValidateDtoOptions {
  validatorOptions?: ValidatorOptions;
  transform?: boolean;
}

const DEFAULT_VALIDATOR_OPTIONS: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
};

export const validateDto = <T extends object>(
  DtoClass: ClassConstructor<T>,
  target: RequestTarget = "body",
  options?: ValidateDtoOptions,
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const payload = req[target];
    const dto = plainToInstance(DtoClass, payload);
    const errors = await validate(dto, {
      ...DEFAULT_VALIDATOR_OPTIONS,
      ...options?.validatorOptions,
    });

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }

    if (options?.transform !== false) {
      if (target === "body") {
        // req.body is a regular writable property
        req.body = dto;
      } else {
        // req.query and req.params are getter-only on IncomingMessage,
        // so we mutate the existing object in-place instead of reassigning.
        Object.assign(req[target], dto);
      }
    }

    next();
  };
};
