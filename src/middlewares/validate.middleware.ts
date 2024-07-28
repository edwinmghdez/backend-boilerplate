import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateMiddleware(dto: any): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    const dtoInstance = plainToInstance(dto, req.body);
    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const formattedErrors = formatValidationErrors(errors);
        res.status(422).send({
          error: {
            message: 'Unprocessable Content',
            details: formattedErrors
          }
        });
      } else {
        req.body = dtoInstance;
        next();
      }
    });
  }
}

function formatValidationErrors(errors: ValidationError[]): any {
  return errors.map(error => {
    return {
      constraints: error.constraints
    }
  });
}
