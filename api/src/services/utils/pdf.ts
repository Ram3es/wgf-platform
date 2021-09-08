import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { launch } from 'puppeteer';

import { UserEntity } from 'src/user/entities/user.entity';

export const createPdf = async (
  user: UserEntity,
  file: string,
  url: string
) => {
  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1600, height: 1500 },
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 15000,
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
