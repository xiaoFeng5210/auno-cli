import fs from 'node:fs/promises'

export async function createPackageFile(rootDir: string) {
  const content = `
    {
      "name": "${rootDir}",
      "version": "0.0.1",
      "description": "",
      "main": "dist/index.js",
      "type": "module",
      "scripts": {
        "watch": "tsup --format esm --watch",
        "build": "tsup --format esm && tsup --dts",
        "dts": "tsup --dts"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "@types/node": "^20.11.10",
        "tsup": "^8.0.1",
        "typescript": "^5.3.3"
      }
    }
  `
  await fs.writeFile(`${rootDir}/package.json`, content.trim())
}
