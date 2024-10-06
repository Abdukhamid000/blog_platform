import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { IsString, IsUUID, validate } from "class-validator";
import { HttpStatus } from "../enums/http-status.enum";

class Params {
  @IsString()
  @IsUUID()
  id: string;
}

export function routeParamsValidator() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance(Params, req.params);

    const errors = await validate(dtoObject);
    const errorMessages = errors.map((error) =>
      Object.values(error.constraints || {}).join(", ")
    );

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Invalid route params",
        errors: errorMessages,
      });
    } else {
      next();
    }
  };
}
