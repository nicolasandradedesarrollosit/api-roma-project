import { plainToInstance, type ClassConstructor } from "class-transformer";
import { validate, type ValidatorOptions } from "class-validator";
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
			req[target] = dto as Request[typeof target];
		}

		next();
	};
};