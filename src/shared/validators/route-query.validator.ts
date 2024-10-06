import { Request, Response, NextFunction } from "express";
import { plainToInstance, Transform } from "class-transformer";
import { IsNumber, IsOptional, Max, Min, validate } from "class-validator";
import { HttpStatus } from "../enums/http-status.enum";

class Query {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(100)
  limit: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  offset: number;
}

export function routeQueryValidator() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance(Query, req.query);

    const errors = await validate(dtoObject);
    const errorMessages = errors.map((error) =>
      Object.values(error.constraints || {}).join(", ")
    );

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Invalid query params",
        errors: errorMessages,
      });
    } else {
      next();
    }
  };
}
