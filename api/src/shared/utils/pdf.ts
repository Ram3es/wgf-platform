import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

import { UserEntity } from 'src/user/entities/user.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

export const createPdf = async (
  user: UserEntity,
  file: string,
  url: string
) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1600, height: 1500 },
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  });

  const pdf = await page.pdf({
    printBackground: true,
    path: `${file}`,
    format: 'a4',
    scale: 0.5,
  });

  const base64 = pdf.toString('base64');

  await browser.close();

  setTimeout(() => {
    if (existsSync(join(process.cwd(), file))) {
      return unlinkSync(join(process.cwd(), file));
    }
  }, 20000);

  return base64;
};
