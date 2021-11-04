import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

export class Browser {
  private static instance: Browser;

  constructor() {
    if (!Browser.instance) {
      Browser.instance = this;
    }

    return Browser.instance;
  }

  static async getBrowser() {
    return puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1600, height: 1500 },
    });
  }
}

export const createPdf = async (file: string, url: string) => {
  const page = await (await Browser.getBrowser()).newPage();

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

  await page.close();

  setTimeout(() => {
    if (existsSync(join(process.cwd(), file))) {
      return unlinkSync(join(process.cwd(), file));
    }
  }, 20000);

  return base64;
};
