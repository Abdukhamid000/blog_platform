import { Request, Response, NextFunction } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { HttpStatus } from "../enums/http-status.enum";

export function requestBodyValidator<T, V>(dtoClass: ClassConstructor<T>) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance<T, V>(dtoClass, req.body || {});

    const errors = await validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    const errorMessages = errors.map((error) =>
      Object.values(error.constraints || {}).join(", ")
    );

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Validation failed",
        errors: errorMessages,
      });
    } else {
      next();
    }
  };
}
