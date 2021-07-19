import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ServeHTMLMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const file = join(process.cwd(), 'pdf', req.query.file.toString());
    if (!existsSync(file)) {
      throw new BadRequestException();
    }
    
    res.sendFile(file);
  }
}
