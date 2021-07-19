import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ServeHTMLMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const file = join(process.cwd(), req.params[0]);

    if (!existsSync(file)) {
      throw new HttpException(
        'Pdf file has expired. Please print again.',
        HttpStatus.BAD_REQUEST
      );
    }

    res.sendFile(file);
  }
}
