import fs from 'node:fs/promises'
import { lintCode } from '../utils/lint'

export async function createPackageFile(rootDir: string) {
  const content = `
{
      "name": "${rootDir}",
      "version": "0.0.1",
      "description": "",
      "main": "dist/index.js",
      "type": "module",
      "scripts": {
        "start": "nodemon --delay 1000ms dist/index.js",
        "tsup-watch": "tsup --format esm --watch",
        "build": "tsup --format esm && tsup --dts",
        "dts": "tsup --dts"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "@types/node": "^20.11.10",
        "nodemon": "^3.0.3",
        "tsup": "^8.0.1",
        "typescript": "^5.3.3"
      }
}`;
  const lintCode = JSON.stringify(content.trim(), null, 4)
  await fs.writeFile(`${rootDir}/package.json`, content.trim())
}
